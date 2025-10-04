
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { SECTIONS, NAV_ORDER, LIGHTING_PRESETS } from '../constants';
import { Section } from '../types';

interface SceneProps {
  onObjectClick: (sectionKey: string) => void;
  onObjectHover: (section: Section | null) => void;
  currentSectionKey: string | null;
  lightingMultiplier: number;
  animationSpeed: number;
}

const SceneComponent: React.FC<SceneProps> = ({ onObjectClick, onObjectHover, currentSectionKey, lightingMultiplier, animationSpeed }) => {
  const mountRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animatedObjectsRef = useRef<{ group: THREE.Group; rotationSpeed: THREE.Vector3 }[]>([]);
  const interactableObjectsRef = useRef<THREE.Group[]>([]);
  const backgroundEffectsRef = useRef<Record<string, THREE.Object3D>>({});
  const backgroundAnimatorsRef = useRef<Record<string, (time: number, delta: number) => void>>({});
  const lightingRef = useRef<Record<string, THREE.Light>>({});
  const modelRefs = useRef<Record<string, THREE.Mesh>>({});
  const snowParticleDataRef = useRef<{ angle: number; radius: number; speedY: number; speedAngle: number; }[]>([]);
  
  const baseIntensity = {
      ambient: 4.0,
      directional: 5.0,
      hemisphere: 2.0,
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Basic Setup ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({ canvas: mountRef.current, antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, baseIntensity.ambient * 2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, baseIntensity.directional * 2);
    directionalLight.position.set(5, 10, 7.5);
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, baseIntensity.hemisphere * 2);
    scene.add(ambientLight, directionalLight, hemisphereLight);
    lightingRef.current = { ambientLight, directionalLight, hemisphereLight };

    // --- Controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 4;
    controls.maxDistance = 25;
    camera.position.z = 20;
    
    // --- Object Creation ---
    const radius = 7;
    NAV_ORDER.forEach((key, index) => {
        const angle = (index / NAV_ORDER.length) * Math.PI * 2;
        const position = new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle * 2) * 2, Math.sin(angle) * radius);
        
        let object: THREE.Object3D;
        const group = new THREE.Group();
        group.name = key;
        
        switch (key) {
            case 'intro': object = new THREE.Mesh(new THREE.TorusKnotGeometry(0.7, 0.25, 100, 16), new THREE.MeshStandardMaterial({ color: '#4956F9', roughness: 0.2, metalness: 0.5 })); break;
            case 'definition': object = new THREE.Mesh(new THREE.IcosahedronGeometry(0.8, 0), new THREE.MeshStandardMaterial({ color: '#004AAD', flatShading: true })); break;
            case 'types': object = new THREE.Mesh(new THREE.DodecahedronGeometry(0.8, 0), new THREE.MeshStandardMaterial({ color: '#FFFFFF', flatShading: true })); break;
            case 'electrolytes': object = new THREE.Mesh(new THREE.OctahedronGeometry(0.8, 0), new THREE.MeshStandardMaterial({ color: '#4956F9', flatShading: true })); break;
            case 'vaporPressure': object = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.2, 16, 100), new THREE.MeshStandardMaterial({ color: '#ffde1d', roughness: 0.2, metalness: 0.5 })); break;
            case 'boilingPoint':
                const t = new THREE.Group(); t.add(new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 }))); const s = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.5, 32), new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 })); s.position.y = 0.75; t.add(s); const l = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8, 32), new THREE.MeshStandardMaterial({ color: 0xff0000 })); l.position.y = 0.4; t.add(l); object = t; modelRefs.current.thermometerLiquid = l;
                break;
            case 'freezingPoint': object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: '#FFFFFF', transparent: true, opacity: 0.8, roughness: 0.1, metalness: 0.1 })); break;
            case 'osmoticPressure': object = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), new THREE.MeshStandardMaterial({ color: '#4956F9', transparent: true, opacity: 0.8 })); break;
            case 'applications': object = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 1, 6), new THREE.MeshStandardMaterial({ color: '#004AAD', flatShading: true })); break;
            case 'summary': const sh = new THREE.Shape(); sh.moveTo(0, 0.7); for (let i = 0; i <= 10; i++) { const r = i % 2 === 0 ? 0.7 : 0.35; const a = i / 10 * Math.PI * 2; sh.lineTo(Math.sin(a) * r, Math.cos(a) * r); } object = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.2, bevelEnabled: false }), new THREE.MeshStandardMaterial({ color: '#ffde1d'})); break;
            default: object = new THREE.Mesh(new THREE.SphereGeometry(0.7), new THREE.MeshStandardMaterial({ color: 0xffffff })); break;
        }

        group.add(object);
        group.position.copy(position);
        scene.add(group);
        interactableObjectsRef.current.push(group);
        animatedObjectsRef.current.push({group, rotationSpeed: new THREE.Vector3(Math.random()*0.005, Math.random()*0.005, 0)});
    });
    
    // --- Background Effects ---
    const setupBackgrounds = () => {
        // 1. Default: Molecular Plexus
        const plexusGroup = new THREE.Group();
        const plexusPoints = Array.from({ length: 200 }, () => new THREE.Vector3((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 50));
        const plexusLinesGeometry = new THREE.BufferGeometry();
        const plexusPositions = plexusPoints.slice(0, 100).flatMap(p => [p, plexusPoints[Math.floor(Math.random() * plexusPoints.length)]]).flatMap(v => v.toArray());
        plexusLinesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(plexusPositions, 3));
        const plexus = new THREE.LineSegments(plexusLinesGeometry, new THREE.LineBasicMaterial({ color: '#004AAD', transparent: true, opacity: 0.2 }));
        plexusGroup.add(plexus);
        scene.add(plexusGroup);
        backgroundEffectsRef.current.default = plexusGroup;
        backgroundAnimatorsRef.current.default = () => { plexus.rotation.y += 0.0002; };

        // 2. Intro: Salting the Road
        const introGroup = new THREE.Group();
        const road = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshStandardMaterial({ color: 0x1a1a2a, roughness: 0.8 }));
        road.rotation.x = -Math.PI / 2;
        road.position.y = -10;
        introGroup.add(road);
        const snowGeo = new THREE.BufferGeometry();
        const snowVerts = Array.from({ length: 2000 }, () => [(Math.random() - 0.5) * 80, Math.random() * 40 - 10, (Math.random() - 0.5) * 80]).flat();
        snowGeo.setAttribute('position', new THREE.Float32BufferAttribute(snowVerts, 3));
        const introSnow = new THREE.Points(snowGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.15, transparent: true, opacity: 0.8, depthWrite: false }));
        introGroup.add(introSnow);
        scene.add(introGroup);
        backgroundEffectsRef.current.intro = introGroup;
        backgroundAnimatorsRef.current.intro = () => {
            const pos = introSnow.geometry.attributes.position.array as Float32Array;
            for (let i = 1; i < pos.length; i += 3) { pos[i] -= 0.05; if (pos[i] < -10) pos[i] = 30; }
            introSnow.geometry.attributes.position.needsUpdate = true;
        };
        
        // 3. Definition: Particle Scale
        const definitionGroup = new THREE.Group();
        const largeParticles = new THREE.Group();
        for(let i=0; i < 5; i++) {
            const mesh = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.1, 100, 16), new THREE.MeshStandardMaterial({color: 0x004AAD, roughness:0.1, metalness: 0.2}));
            mesh.position.set((Math.random() - 0.5) * 10 - 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10 - 5);
            largeParticles.add(mesh);
        }
        definitionGroup.add(largeParticles);
        const smallGeo = new THREE.BufferGeometry();
        const smallVerts = Array.from({ length: 500 }, () => [(Math.random() - 0.5) * 10 + 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10 - 5]).flat();
        smallGeo.setAttribute('position', new THREE.Float32BufferAttribute(smallVerts, 3));
        const smallParticles = new THREE.Points(smallGeo, new THREE.PointsMaterial({color: 0xffde1d, size: 0.1}));
        definitionGroup.add(smallParticles);
        scene.add(definitionGroup);
        backgroundEffectsRef.current.definition = definitionGroup;
        backgroundAnimatorsRef.current.definition = () => {
            largeParticles.rotation.y += 0.001;
            smallParticles.rotation.y -= 0.001;
        };

        // 4. Types: Four Windows
        const typesGroup = new THREE.Group();
        const portalPositions = [new THREE.Vector3(-6, 3, -10), new THREE.Vector3(6, 3, -10), new THREE.Vector3(-6, -3, -10), new THREE.Vector3(6, -3, -10)];
        const portalBgs = ['vaporPressure', 'boilingPoint', 'freezingPoint', 'osmoticPressure'];
        portalPositions.forEach((pos, i) => {
            const portal = new THREE.Group();
            const ring = new THREE.Mesh(new THREE.TorusGeometry(2, 0.1, 16, 100), new THREE.MeshStandardMaterial({color: 0xffde1d, emissive: 0xffde1d, emissiveIntensity: 0.5}));
            portal.add(ring);
            // Add mini particle systems here later if desired
            portal.position.copy(pos);
            typesGroup.add(portal);
        });
        scene.add(typesGroup);
        backgroundEffectsRef.current.types = typesGroup;
        backgroundAnimatorsRef.current.types = () => { typesGroup.rotation.y += 0.0005; };
        
        // 5. Electrolytes: Dissociation
        const electrolytesGroup = new THREE.Group();
        const molecules: { group: THREE.Group, velocity: THREE.Vector3, type: 'NaCl' | 'Sucrose', dissociated: boolean }[] = [];
        for (let i=0; i<15; i++) {
            const type = Math.random() > 0.5 ? 'NaCl' : 'Sucrose';
            const group = new THREE.Group();
            if(type === 'NaCl') {
                const na = new THREE.Mesh(new THREE.SphereGeometry(0.3), new THREE.MeshStandardMaterial({color: 0x4956F9})); na.position.x = -0.3; na.name="na";
                const cl = new THREE.Mesh(new THREE.SphereGeometry(0.3), new THREE.MeshStandardMaterial({color: 0xffde1d})); cl.position.x = 0.3; cl.name="cl";
                group.add(na, cl);
            } else {
                const sucrose = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5), new THREE.MeshStandardMaterial({color: 0xffffff}));
                group.add(sucrose);
            }
            group.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30 - 15);
            electrolytesGroup.add(group);
            molecules.push({group, velocity: new THREE.Vector3((Math.random()-0.5)*0.02, (Math.random()-0.5)*0.02, (Math.random()-0.5)*0.02), type, dissociated: false});
        }
        scene.add(electrolytesGroup);
        backgroundEffectsRef.current.electrolytes = electrolytesGroup;
        backgroundAnimatorsRef.current.electrolytes = () => {
            molecules.forEach(m => {
                m.group.position.add(m.velocity);
                if(m.group.position.length() > 25) m.group.position.set(0,0,-15);

                if (m.type === 'NaCl' && !m.dissociated && m.group.position.z > -2 && m.group.position.z < 2) {
                    m.dissociated = true;
                    gsap.to(m.group.getObjectByName('na')!.position, {x: -2, duration: 2});
                    gsap.to(m.group.getObjectByName('cl')!.position, {x: 2, duration: 2, onComplete: () => {
                        m.group.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, -25);
                        m.group.getObjectByName('na')!.position.set(-0.3, 0, 0);
                        m.group.getObjectByName('cl')!.position.set(0.3, 0, 0);
                        m.dissociated = false;
                    }});
                }
            });
        };

        // 6. Vapor Pressure (Upgraded with Dense Vapor)
        const vaporPressureGroup = new THREE.Group();
        const surface = new THREE.GridHelper(40, 20, 0xADD8E6, 0xADD8E6);
        surface.position.y = -2;
        vaporPressureGroup.add(surface);

        // Solvent particles (the liquid)
        const createPoints = (count: number, color: number) => {
            const geo = new THREE.BufferGeometry();
            const verts = Array.from({ length: count }, () => [(Math.random() - 0.5) * 40, (Math.random() * 10) - 12, (Math.random() - 0.5) * 40]).flat();
            geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
            return new THREE.Points(geo, new THREE.PointsMaterial({color, size: 0.2, transparent: true, opacity: 0.8}));
        };
        const solvent = createPoints(800, 0xffffff);
        
        // Solute particle that blocks the surface
        const solute = new THREE.Mesh(new THREE.TorusKnotGeometry(2,0.2), new THREE.MeshBasicMaterial({color:0xffde1d})); 
        solute.position.y = -1.8;
        
        // Dense vapor particles
        const vaporGeo = new THREE.BufferGeometry();
        const vaporCount = 1500;
        const vaporVerts = [];
        const vaporVelocities = Array.from({ length: vaporCount }, () => Math.random() * 0.03 + 0.02);
        for (let i = 0; i < vaporCount; i++) {
            vaporVerts.push(
                (Math.random() - 0.5) * 40, // x
                Math.random() * 30 - 10,     // y (spread out initially)
                (Math.random() - 0.5) * 40  // z
            );
        }
        vaporGeo.setAttribute('position', new THREE.Float32BufferAttribute(vaporVerts, 3));
        const vapor = new THREE.Points(vaporGeo, new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.3,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        }));

        vaporPressureGroup.add(solvent, solute, vapor);
        scene.add(vaporPressureGroup);
        backgroundEffectsRef.current.vaporPressure = vaporPressureGroup;
        backgroundAnimatorsRef.current.vaporPressure = () => {
            // Animate solvent particles (liquid) with random walk
            const solventPos = solvent.geometry.attributes.position.array as Float32Array;
            for(let i=0; i<solventPos.length; i+=3) {
                solventPos[i] += (Math.random() - 0.5) * 0.05;
                solventPos[i+1] += (Math.random() - 0.5) * 0.05;
                solventPos[i+2] += (Math.random() - 0.5) * 0.05;
                // Keep them within the liquid volume
                if(solventPos[i+1] > -2) solventPos[i+1] = -12; // Reset if they go above surface
                if(solventPos[i+1] < -12) solventPos[i+1] = -2; // Reset if they go below bottom
                if(Math.abs(solventPos[i]) > 20) solventPos[i] *= -1; // Bounce off sides
                if(Math.abs(solventPos[i+2]) > 20) solventPos[i+2] *= -1; // Bounce off sides
            }
            solvent.geometry.attributes.position.needsUpdate = true;
            
            // Animate dense vapor particles
            const vaporPos = vapor.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < vaporCount; i++) {
                const yIndex = i * 3 + 1;
                vaporPos[yIndex] += vaporVelocities[i]; // Move up

                // Reset particle to the bottom when it reaches the top
                if (vaporPos[yIndex] > 20) {
                    vaporPos[yIndex] = -12; // Start from below the surface
                    vaporPos[i * 3] = (Math.random() - 0.5) * 40;
                    vaporPos[i * 3 + 2] = (Math.random() - 0.5) * 40;
                }
            }
            vapor.geometry.attributes.position.needsUpdate = true;
        };

        // 7. Boiling Point
        const boilingPointGroup = new THREE.Group();
        const embersGeometry = new THREE.BufferGeometry();
        const embersVertices = Array.from({ length: 500 }, () => [Math.random() * 40 - 20, Math.random() * 20 - 10, Math.random() * 40 - 20]).flat();
        embersGeometry.setAttribute('position', new THREE.Float32BufferAttribute(embersVertices, 3));
        const embers = new THREE.Points(embersGeometry, new THREE.PointsMaterial({ color: 0xffaa00, size: 0.08, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
        boilingPointGroup.add(embers);
        const lavaMaterial = new THREE.ShaderMaterial({
            uniforms: { time: { value: 1.0 }, color1: { value: new THREE.Color(0xff4500) }, color2: { value: new THREE.Color(0x8B0000) } },
            vertexShader: document.getElementById('lava-vertex-shader')!.textContent!,
            fragmentShader: document.getElementById('lava-fragment-shader')!.textContent!,
        });
        const lavaFloor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 50, 50), lavaMaterial);
        lavaFloor.rotation.x = -Math.PI / 2;
        lavaFloor.position.y = -10;
        boilingPointGroup.add(lavaFloor);
        scene.add(boilingPointGroup);
        backgroundEffectsRef.current.boilingPoint = boilingPointGroup;
        backgroundAnimatorsRef.current.boilingPoint = (time) => { lavaMaterial.uniforms.time.value = time * 5.0; };

        // 8. Freezing Point
        const freezingPointGroup = new THREE.Group();
        const snowGeometry = new THREE.BufferGeometry();
        const snowVertices = [];
        const localSnowParticleData = [];
        const snowCount = 4000;
        for (let i = 0; i < snowCount; i++) {
            const radius = Math.random() * 25 + 5;
            const angle = Math.random() * Math.PI * 2;
            snowVertices.push(radius * Math.cos(angle), Math.random() * 40 - 20, radius * Math.sin(angle));
            localSnowParticleData.push({ angle, radius, speedY: Math.random() * 0.06 + 0.02, speedAngle: (Math.random() - 0.5) * 0.01 });
        }
        snowParticleDataRef.current = localSnowParticleData;
        snowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(snowVertices, 3));
        const snow = new THREE.Points(snowGeometry, new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.7 }));
        freezingPointGroup.add(snow);
        const iceFloor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshStandardMaterial({ color: 0xADD8E6, transparent: true, opacity: 0.4, roughness: 0.1, metalness: 0.9 }));
        iceFloor.rotation.x = -Math.PI / 2;
        iceFloor.position.y = -10;
        freezingPointGroup.add(iceFloor);
        scene.add(freezingPointGroup);
        backgroundEffectsRef.current.freezingPoint = freezingPointGroup;
        backgroundAnimatorsRef.current.freezingPoint = () => {
            const positions = snow.geometry.attributes.position.array as Float32Array;
            const particleData = snowParticleDataRef.current;
            for (let i = 0; i < particleData.length; i++) {
                const data = particleData[i];
                data.angle += data.speedAngle;
                positions[i * 3 + 1] -= data.speedY;
                if (positions[i * 3 + 1] < -20) positions[i * 3 + 1] = 20;
                positions[i * 3] = data.radius * Math.cos(data.angle);
                positions[i * 3 + 2] = data.radius * Math.sin(data.angle);
            }
            snow.geometry.attributes.position.needsUpdate = true;
        };

        // 9. Osmotic Pressure (Upgraded)
        const osmosisGroup = new THREE.Group();
        const membrane = new THREE.Mesh(new THREE.PlaneGeometry(20, 15), new THREE.MeshStandardMaterial({color: 0x98FB98, transparent: true, opacity: 0.2, side: THREE.DoubleSide}));
        osmosisGroup.add(membrane);
        const createOsmosisParticles = (count: number, color: number, rangeX: [number, number], size: number) => {
            const geo = new THREE.BufferGeometry();
            const verts = Array.from({length: count}, () => [Math.random() * (rangeX[1]-rangeX[0]) + rangeX[0], Math.random() * 15 - 7.5, Math.random() * 20 - 10]).flat();
            geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
            const velocities = Array.from({length: count}, () => [(Math.random()-0.5)*0.1, (Math.random()-0.5)*0.1, (Math.random()-0.5)*0.1]).flat();
            geo.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));
            return new THREE.Points(geo, new THREE.PointsMaterial({ color, size }));
        };
        const solventParticles = createOsmosisParticles(300, 0xffffff, [-15, 15], 0.2);
        const soluteParticles = createOsmosisParticles(100, 0xffde1d, [1, 15], 0.4);
        osmosisGroup.add(solventParticles, soluteParticles);
        osmosisGroup.position.z = -15;
        scene.add(osmosisGroup);
        backgroundEffectsRef.current.osmoticPressure = osmosisGroup;
        backgroundAnimatorsRef.current.osmoticPressure = () => {
            [soluteParticles, solventParticles].forEach((pSystem, isSolute) => {
                const pos = pSystem.geometry.attributes.position.array as Float32Array;
                const vel = pSystem.geometry.attributes.velocity.array as Float32Array;
                for(let i=0; i < pos.length; i+=3) {
                    pos[i] += vel[i]; pos[i+1] += vel[i+1]; pos[i+2] += vel[i+2];
                    if (pos[i] < -15 || pos[i] > 15) vel[i] *= -1;
                    if (pos[i+1] < -7.5 || pos[i+1] > 7.5) vel[i+1] *= -1;
                    if (pos[i+2] < -10 || pos[i+2] > 10) vel[i+2] *= -1;
                    if (isSolute && pos[i] < 0.1 && pos[i] > -0.1) vel[i] *= -1;
                }
                pSystem.geometry.attributes.position.needsUpdate = true;
            });
        };
        
        // 10. Applications & Summary
        const panoramaGroup = new THREE.Group();
        const pSnow = new THREE.Points(snowGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, transparent: true, opacity: 0.5, depthWrite: false }));
        const pEmbers = new THREE.Points(embersGeometry, new THREE.PointsMaterial({ color: 0xffaa00, size: 0.05, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
        panoramaGroup.add(pSnow, pEmbers);
        scene.add(panoramaGroup);
        backgroundEffectsRef.current.applications = panoramaGroup;
        backgroundEffectsRef.current.summary = panoramaGroup;
        backgroundAnimatorsRef.current.applications = backgroundAnimatorsRef.current.summary = () => {
            const snowPos = pSnow.geometry.attributes.position.array as Float32Array;
            for (let i = 1; i < snowPos.length; i += 3) { snowPos[i] -= 0.02; if (snowPos[i] < -20) snowPos[i] = 20; }
            pSnow.geometry.attributes.position.needsUpdate = true;
            pEmbers.rotation.y += 0.0005;
        }

    };

    setupBackgrounds();

    // --- Event Listeners and Animation Loop ---
    const handleResize = () => {
        if (!cameraRef.current || !rendererRef.current) return;
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (!controlsRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;
        
        controlsRef.current.update();
        animatedObjectsRef.current.forEach(obj => { obj.group.rotation.y += obj.rotationSpeed.y; });
        
        const time = clock.getElapsedTime();
        const delta = clock.getDelta();
        const activeBg = currentSectionKey ? SECTIONS[currentSectionKey].bg : 'default';

        if (backgroundAnimatorsRef.current[activeBg]) {
            backgroundAnimatorsRef.current[activeBg](time, delta);
        }

        rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      rendererRef.current?.dispose();
    };
  }, []);

  // Effect to handle camera movement and environment changes
  useEffect(() => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    const overviewState = { position: new THREE.Vector3(0, 0, 14), target: new THREE.Vector3(0, 0, 0) };

    if (currentSectionKey) {
      const sectionObject = interactableObjectsRef.current.find(o => o.name === currentSectionKey);
      if (sectionObject) {
        const targetPosition = sectionObject.position.clone();
        const cameraPosition = targetPosition.clone().add(new THREE.Vector3(0, 1, 4));
        gsap.to(camera.position, { ...cameraPosition, duration: animationSpeed, ease: 'power2.inOut' });
        gsap.to(controls.target, { ...targetPosition, duration: animationSpeed, ease: 'power2.inOut' });
        
        if (modelRefs.current.thermometerLiquid) {
          gsap.to(modelRefs.current.thermometerLiquid.scale, { y: 1, duration: 0.5 });
          gsap.to(modelRefs.current.thermometerLiquid.position, { y: 0.4, duration: 0.5 });
          if(currentSectionKey === 'boilingPoint') {
             gsap.to(modelRefs.current.thermometerLiquid.scale, { y: 2, duration: 1.5, ease: 'power3.inOut' });
             gsap.to(modelRefs.current.thermometerLiquid.position, { y: 0.8, duration: 1.5, ease: 'power3.inOut' });
          }
        }
      }
    } else {
      gsap.to(camera.position, { ...overviewState.position, duration: animationSpeed, ease: 'power2.inOut' });
      gsap.to(controls.target, { ...overviewState.target, duration: animationSpeed, ease: 'power2.inOut' });
      if (modelRefs.current.thermometerLiquid) {
          gsap.to(modelRefs.current.thermometerLiquid.scale, { y: 1, duration: 0.5 });
          gsap.to(modelRefs.current.thermometerLiquid.position, { y: 0.4, duration: 0.5 });
      }
    }
    
    const targetBg = currentSectionKey ? SECTIONS[currentSectionKey].bg : 'default';
    const preset = LIGHTING_PRESETS[targetBg] || LIGHTING_PRESETS.default;

    Object.values(backgroundEffectsRef.current).forEach(effect => { (effect as THREE.Object3D).visible = false; });
    
    if (backgroundEffectsRef.current[targetBg]) {
        backgroundEffectsRef.current[targetBg].visible = true;
    }

    if (lightingRef.current.ambientLight) {
        const color = new THREE.Color(preset.ambient);
        gsap.to((lightingRef.current.ambientLight as THREE.Light).color, { r: color.r, g: color.g, b: color.b, duration: animationSpeed });
    }
    if (lightingRef.current.directionalLight) {
        const color = new THREE.Color(preset.directional);
        gsap.to((lightingRef.current.directionalLight as THREE.Light).color, { r: color.r, g: color.g, b: color.b, duration: animationSpeed });
    }
     if (lightingRef.current.hemisphereLight) {
        const skyColor = new THREE.Color(preset.hemisphereSky);
        const groundColor = new THREE.Color(preset.hemisphereGround);
        gsap.to((lightingRef.current.hemisphereLight as THREE.HemisphereLight).color, { r: skyColor.r, g: skyColor.g, b: skyColor.b, duration: animationSpeed });
        gsap.to((lightingRef.current.hemisphereLight as THREE.HemisphereLight).groundColor, { r: groundColor.r, g: groundColor.g, b: groundColor.b, duration: animationSpeed });
    }
    if (sceneRef.current) {
        const fogColor = new THREE.Color(preset.fog);
        if(!sceneRef.current.fog) sceneRef.current.fog = new THREE.Fog(fogColor, 20, 80);
        gsap.to(sceneRef.current.fog.color, { r: fogColor.r, g: fogColor.g, b: fogColor.b, duration: animationSpeed });
    }


  }, [currentSectionKey, animationSpeed]);

  useEffect(() => {
    if (lightingRef.current.ambientLight) {
        (lightingRef.current.ambientLight as THREE.Light).intensity = baseIntensity.ambient * lightingMultiplier;
        (lightingRef.current.directionalLight as THREE.DirectionalLight).intensity = baseIntensity.directional * lightingMultiplier;
        (lightingRef.current.hemisphereLight as THREE.HemisphereLight).intensity = baseIntensity.hemisphere * lightingMultiplier;
    }
  }, [lightingMultiplier]);

  useEffect(() => {
     const raycaster = new THREE.Raycaster();
     const mouse = new THREE.Vector2();
     let intersectedObject: THREE.Object3D | null = null;
     
     const handleMouseMove = (event: MouseEvent) => {
         mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
         mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

         if (!cameraRef.current) return;
         raycaster.setFromCamera(mouse, cameraRef.current);
         const intersects = raycaster.intersectObjects(interactableObjectsRef.current, true);
         
         let hoveredGroup: THREE.Group | null = null;
         if(intersects.length > 0) {
             let object = intersects[0].object;
             while(object.parent && !interactableObjectsRef.current.includes(object as THREE.Group)) {
                 object = object.parent;
             }
             hoveredGroup = object as THREE.Group;
         }
         
         if (intersectedObject !== hoveredGroup) {
            if (intersectedObject) gsap.to(intersectedObject.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
            
            intersectedObject = hoveredGroup;
            
            if (intersectedObject) {
                 gsap.to(intersectedObject.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.3 });
                 onObjectHover(SECTIONS[intersectedObject.name]);
                 document.body.style.cursor = 'pointer';
            } else {
                onObjectHover(null);
                document.body.style.cursor = 'default';
            }
         }
     };

     const handleClick = () => {
         if (intersectedObject) {
             onObjectClick(intersectedObject.name);
         }
     };
     
     window.addEventListener('mousemove', handleMouseMove);
     window.addEventListener('click', handleClick);

     return () => {
         window.removeEventListener('mousemove', handleMouseMove);
         window.removeEventListener('click', handleClick);
     };
  }, [onObjectClick, onObjectHover]);

  return <canvas ref={mountRef} className="fixed top-0 left-0 z-[1]" />;
};

export default SceneComponent;