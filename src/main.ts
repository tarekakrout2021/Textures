// external dependencies
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// local from us provided utilities
import * as utils from './lib/utils';
import RenderWidget from './lib/rendererWidget';
import { Application, createWindow } from './lib/window';

// helper lib, provides exercise dependent prewritten Code
import * as helper from './helper';
import ImageWidget from './imageWidget';


import UvVertexShader from './shader/uv.v.glsl?raw';
import UvFragmentShader from './shader/uv.f.glsl?raw';
import SphericalVertexShader from './shader/spherical.v.glsl?raw';
import SphericalFragmentShader from './shader/spherical.f.glsl?raw';
import SphericalFixVertexShader from './shader/sphericalFix.v.glsl?raw';
import SphericalFixFragmentShader from './shader/sphericalFix.f.glsl?raw';
import EnvVertexShader from './shader/environment.v.glsl?raw';
import EnvFragmentShader from './shader/environment.f.glsl?raw';
import normalVertexShader from './shader/normal.v.glsl?raw';
import normalFragmentShader from './shader/normal.f.glsl?raw';



var root = Application("Texturing");


var textureDiv = createWindow("texture");
root.appendChild(textureDiv);

var ImgWid = new ImageWidget(textureDiv);
var settings = new helper.Settings();
ImgWid.setImage("src/textures/earth.jpg");
ImgWid.enableDrawing();



var scene = new THREE.Scene();
var textureImg : THREE.Texture;
var geo; 
var model = new THREE.Mesh(); 
settings.geometry= helper.Geometries.quad; 
settings.shader= helper.Shaders.uv;  
settings.environment = false; 

var canvTex = new THREE.CanvasTexture (ImgWid.getDrawingCanvas());
canvTex.needsUpdate = true;

settings.pen = function(){
  ImgWid.clearDrawing();
  canvTex = new THREE.CanvasTexture (ImgWid.getDrawingCanvas());
  canvTex.needsUpdate = true;
};

settings.pen();


//light for task 8
var lightgeo = new THREE.SphereGeometry(0.1, 32, 32);
var lightMaterial = new THREE.MeshBasicMaterial({color: 0xff8010});
var light = new THREE.Mesh(lightgeo, lightMaterial);
light.position.x = 2.;
light.position.y = 2.;
light.position.z = 3.; 
scene.add(light);


quadFunction(); 

function callback(changed: utils.KeyValuePair<helper.Settings>) {
  // console.log(changed);

  ImgWid.setImage("src/textures/" + settings.texture.toLowerCase() + ".jpg");
  if(settings.texture ==='Environment') {
    ImgWid.setImage("src/textures/indoor.jpg");
  }
  if(settings.texture ==='Wood') {
    ImgWid.setImage("src/textures/wood_ceiling.jpg");
  }

  switch (changed.key) {
    case "geometry":
      if(settings.geometry === 'Box') boxFunction();
      if(settings.geometry === 'Sphere') sphereFunction(); 
      if(settings.geometry === 'Knot') knotFunction(); 
      if(settings.geometry === 'Quad') quadFunction();
      if(settings.geometry === 'Bunny') bunnyFunction();

      break;
    case "texture":
      textureImg = new THREE.TextureLoader().load('src/textures/'+settings.texture.toLowerCase()+'.jpg' ); 
      if(settings.texture ==='Environment') {
        textureImg = new THREE.TextureLoader().load("src/textures/indoor.jpg");
      }
      if(settings.geometry === 'Box') boxFunction();
      if(settings.geometry === 'Sphere') sphereFunction(); 
      if(settings.geometry === 'Knot') knotFunction(); 
      if(settings.geometry === 'Quad') quadFunction();
      if(settings.geometry === 'Bunny') bunnyFunction();
      
      break;
    case "shader":
      
      if(settings.geometry === 'Box') boxFunction();
      if(settings.geometry === 'Sphere') sphereFunction(); 
      if(settings.geometry === 'Knot') knotFunction(); 
      if(settings.geometry === 'Quad') quadFunction();
      if(settings.geometry === 'Bunny') bunnyFunction();

      break;
    case "environment":
      if(settings.environment  === true){
        textureImg.mapping = THREE.EquirectangularReflectionMapping;
        scene.background =  textureImg ;
      }
      else{
        scene.background = new THREE.Color(0x000000);
      }

      break;
    case "normalmap":
      if(settings.geometry === 'Box') boxFunction();
      if(settings.geometry === 'Sphere') sphereFunction(); 
      if(settings.geometry === 'Knot') knotFunction(); 
      if(settings.geometry === 'Quad') quadFunction();
      if(settings.geometry === 'Bunny') bunnyFunction();

      break;
    default:
      break;
  }
}

function boxFunction  () {
  canvTex.needsUpdate = true;

  geo = helper.createBox();
  var material = new THREE.RawShaderMaterial();
  if(settings.shader == 'UV attribute'){
    material = new THREE.RawShaderMaterial( {
      vertexShader: UvVertexShader,
      fragmentShader: UvFragmentShader
    });
  }
  else if(settings.shader == 'Spherical'){
    material = new THREE.RawShaderMaterial( {
      vertexShader: SphericalVertexShader,
      fragmentShader: SphericalFragmentShader
    });
  }
  else if(settings.shader == 'Spherical (fixed)'){
    material = new THREE.RawShaderMaterial( {
      vertexShader: SphericalFixVertexShader,
      fragmentShader: SphericalFixFragmentShader
    });
  }
  else if(settings.shader == 'Environment Mapping'){
    material = new THREE.RawShaderMaterial( {
      vertexShader: EnvVertexShader,
      fragmentShader: EnvFragmentShader
    });
  }
  

  material.glslVersion = THREE.GLSL3;
   
  loadTexture();

   //  console.log(textureImg);
   
   material.uniforms.textureImg = { value: textureImg };
   material.uniforms.textureCanv = { value: canvTex };
   
   model.geometry=geo;
   model.material=material;

   scene.add(model);
}

function sphereFunction () {
  canvTex.needsUpdate = true;

  geo = helper.createSphere();
  var material = new THREE.RawShaderMaterial();
  if(settings.shader == 'UV attribute'){
    material = new THREE.RawShaderMaterial( {
      vertexShader: UvVertexShader,
      fragmentShader: UvFragmentShader
    });
  }
  else if(settings.shader == 'Spherical'){
    material = new THREE.RawShaderMaterial( {
      vertexShader: SphericalVertexShader,
      fragmentShader: SphericalFragmentShader
    });
  }
  else if(settings.shader == 'Spherical (fixed)'){
    material = new THREE.RawShaderMaterial( {
      vertexShader: SphericalFixVertexShader,
      fragmentShader: SphericalFixFragmentShader
    });
  }
  else if(settings.shader == 'Environment Mapping'){
    material = new THREE.RawShaderMaterial( {
      vertexShader: EnvVertexShader,
      fragmentShader: EnvFragmentShader
    });
  }
  material.glslVersion = THREE.GLSL3;
  loadTexture();

   material.uniforms.textureImg = { value: textureImg };
   material.uniforms.textureCanv = { value: canvTex };

   model.geometry=geo;
   model.material=material;

   scene.remove
   scene.add(model);
}

function knotFunction()  {
  canvTex.needsUpdate = true;


  geo = helper.createKnot();
  var material = new THREE.RawShaderMaterial();
  if(settings.shader == 'UV attribute'){
    material = new THREE.RawShaderMaterial( {
      vertexShader: UvVertexShader,
      fragmentShader: UvFragmentShader
    });
  }
  else if(settings.shader == 'Spherical'){
    material = new THREE.RawShaderMaterial( {
      vertexShader: SphericalVertexShader,
      fragmentShader: SphericalFragmentShader
    });
  }
  else if(settings.shader == 'Spherical (fixed)'){
    material = new THREE.RawShaderMaterial( {
      vertexShader: SphericalFixVertexShader,
      fragmentShader: SphericalFixFragmentShader
    });
  }
   material.glslVersion = THREE.GLSL3;
  loadTexture();  
   //  console.log(textureImg);
   
   material.uniforms.textureImg = { value: textureImg };
   material.uniforms.textureCanv = { value: canvTex };

   model.geometry=geo;
   model.material=material;

   scene.remove;
   scene.add(model);
}



function quadFunction(){
  // console.log("waaaaa");
  canvTex.needsUpdate = true;

  let geoQuad = new THREE.BufferGeometry();

  let vertices = new Float32Array( [
    1.0,  -1.0,  0.0, // v2
    -1.0, 1.0,  0.0, // v1
    -1.0, -1.0, 0.0, // v0


    1.0, 1.0,  0.0,  // v3
    -1.0, 1.0,  0.0, // v1
    1.0,  -1.0,  0.0 // v2
  ] );


  const uvs = new Float32Array([
    1.0, 0.0, // uv2
    0.0, 1.0, // uv1
    0.0, 0.0, // uv0

    1.0, 1.0, // uv3
    0.0, 1.0, // uv1
    1.0, 0.0 // uv2
  ]);
  // itemSize = 3 because there are 3 values (components) per vertex
  geoQuad.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
  geoQuad.setAttribute('uv', new THREE.BufferAttribute(uvs, 2)); 

  var material = new THREE.RawShaderMaterial();
  if(settings.shader == 'UV attribute'){
    material = new THREE.RawShaderMaterial( {
      vertexShader: UvVertexShader,
      fragmentShader: UvFragmentShader
    });
  }
  else if(settings.shader == 'Spherical'){
    material = new THREE.RawShaderMaterial( {
      vertexShader: SphericalVertexShader,
      fragmentShader: SphericalFragmentShader
    });
  }
  else if(settings.shader == 'Spherical (fixed)'){
    material = new THREE.RawShaderMaterial( {
      vertexShader: SphericalFixVertexShader,
      fragmentShader: SphericalFixFragmentShader
    });
  } 
  else if(settings.shader == 'Normal Map'){
    material = new THREE.RawShaderMaterial( {
      vertexShader: normalVertexShader,
      fragmentShader: normalFragmentShader
    });
  }
   material.glslVersion = THREE.GLSL3;

  loadTexture();

  let normalTexture = new THREE.TextureLoader().load('src/textures/'+settings.normalmap.toLocaleLowerCase()+'_normals.jpg' ); 
  if(settings.normalmap == 'Wood'){
    normalTexture = new THREE.TextureLoader().load('src/textures/wood_ceiling_normals.jpg' );
  }
  material.uniforms.normalTexture = { value: normalTexture };
  material.uniforms.light= { value: light.position };
  material.uniforms.textureImg = { value: textureImg };
  material.uniforms.textureCanv = { value: canvTex };

  model.geometry=geoQuad;
  model.material=material;

  scene.remove;
  scene.add(model);
}




function bunnyFunction()  {
  geo = helper.createBunny();
  var material = new THREE.RawShaderMaterial();

  if(settings.shader == 'Spherical'){
    material = new THREE.RawShaderMaterial( {
      vertexShader: SphericalVertexShader,
      fragmentShader: SphericalFragmentShader
    });
  }
  else if(settings.shader == 'Spherical (fixed)'){
    material = new THREE.RawShaderMaterial( {
      vertexShader: SphericalFixVertexShader,
      fragmentShader: SphericalFixFragmentShader
    });
  }

  material.glslVersion = THREE.GLSL3;

  loadTexture();
  
  material.uniforms.textureImg = { value: textureImg };
  material.uniforms.textureCanv = { value: canvTex };

  model.geometry=geo;
  model.material=material;

  scene.remove;
  scene.add(model);
}


function loadTexture(){
  textureImg = new THREE.TextureLoader().load('src/textures/'+settings.texture.toLowerCase()+'.jpg' ); 
  if(settings.texture ==='Environment') {
    textureImg = new THREE.TextureLoader().load("src/textures/indoor.jpg");
  }
  if(settings.texture ==='Wood') {
    textureImg = new THREE.TextureLoader().load("src/textures/wood_ceiling.jpg");
  }

}

// ---------------------------------------------------------------------------
// main entry point

function main(){
  canvTex.needsUpdate = true;


  root.setLayout([["texture", "renderer"]]);
  root.setLayoutColumns(["50%", "50%"]);
  root.setLayoutRows(["100%"]);

  // ---------------------------------------------------------------------------
  // create Settings and create GUI settings
  // let gui = helper.createGUI(settings);
  helper.createGUI(settings);
  // adds the callback that gets called on settings change
  settings.addCallback(callback);


  // ---------------------------------------------------------------------------
  // create RenderDiv
	let rendererDiv = createWindow("renderer");
  root.appendChild(rendererDiv);

  // create renderer
  let renderer = new THREE.WebGLRenderer({
      antialias: true,  // to enable anti-alias and get smoother output
  });

  // create scene
  // let scene = new THREE.Scene();

  // create camera
  let camera = new THREE.PerspectiveCamera();
  helper.setupCamera(camera, scene);

  // create controls
  let controls = new OrbitControls(camera, rendererDiv);
  helper.setupControls(controls);

  let wid = new RenderWidget(rendererDiv, renderer, camera, scene, controls);

  canvTex.needsUpdate = true;
  requestAnimationFrame(wid.animate.bind(wid));
  canvTex.needsUpdate = true;
  wid.update();
  wid.preRenderHook();
  wid.render();

}


// call main entrypoint
main();
