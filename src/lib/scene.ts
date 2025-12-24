import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(15, 1, 0.1, 1000);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
material.emissive = new THREE.Color().setRGB(0.01, 0.07, 0.03);
// const cube = new THREE.Mesh(geometry, material);
// cube.position.set(0, 0, 0.5);
const light = new THREE.DirectionalLight();
light.position.set(-0.3, 1, 0.5)
scene.add(light);

const backlight = new THREE.DirectionalLight(new THREE.Color(200, 200, 200), 0.001);
backlight.position.set(0.2, -1, 0.5)
scene.add(backlight);

let renderer: THREE.WebGLRenderer;
//scene.add(cube);
let cube: THREE.Group<THREE.Object3DEventMap>;

loader.load( 'base_egg.glb', function ( gltf ) {
  scene.add( gltf.scene );
  cube = gltf.scene;
}, undefined, ( error ) => {
  console.error( error );
} );


camera.position.set(0, 0, 12)
//scene.background = (new THREE.Color()).setRGB(64/256, 77/256, 92/256, "srgb");

const animateShell = (
  stateFetcher: () => { xrot: number, yrot: number}
) => {
  const animate = () => {
    requestAnimationFrame(animate);
    
    const state = stateFetcher();

    //const pos = (new THREE.Vector3(-state.xrot, -state.yrot, 20)).setLength(5);
    const pos = new THREE.Vector3(0, 0.5, 1).applyAxisAngle(new THREE.Vector3(-state.xrot, state.yrot, 0).normalize(), -20*Math.PI/180).setLength(-0.25)
    // camera.position.x = pos.x;
    // camera.position.y = pos.y;
    // camera.position.z = pos.z;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.updateProjectionMatrix();

    if (cube) {
      cube.rotation.set(0, 0, 0);
      cube.rotateOnAxis(new THREE.Vector3(-state.xrot, state.yrot, 0), 20*Math.PI/180);
      cube.position.x = pos.x;
      cube.position.y = pos.y;
      cube.position.z = pos.z;
    }

    //const lightAxis = (new THREE.Vector3(state.xrot, state.yrot, 0)).normalize();
    light.rotation.set(0, 0, 0);
    //light.rotateOnAxis(lightAxis, -10)

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  };

  animate();
}

export const resize = (el: HTMLCanvasElement) => {
  renderer.setSize(el.clientWidth, el.clientHeight)
  camera.aspect = el.clientWidth / el.clientHeight;
  camera.updateProjectionMatrix();
};

export const createScene = (el: HTMLCanvasElement, stateFetcher: () => { xrot: number, yrot: number}) => {
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el, alpha: true });
  resize(el);
  animateShell(stateFetcher);
  window.addEventListener('resize', () => {resize(el)});
}
