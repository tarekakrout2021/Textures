// These uniforms and attributes are provided by threejs.
// If you want to add your own, look at https://threejs.org/docs/#api/en/materials/ShaderMaterial #Custom attributes and uniforms
// defines the precision
precision highp float;

// = object.matrixWorld
uniform mat4 modelMatrix;

// = camera.matrixWorldInverse * object.matrixWorld
uniform mat4 modelViewMatrix;

// = camera.projectionMatrix
uniform mat4 projectionMatrix;

// = camera.matrixWorldInverse
uniform mat4 viewMatrix;

// = inverse transpose of modelViewMatrix
uniform mat3 normalMatrix;

// = camera position in world space
uniform vec3 cameraPosition;

uniform bool hasNormal;
uniform sampler2D normalTexture;
uniform vec3 light; 


// default vertex attributes provided by Geometry and BufferGeometry
in vec3 position;
in vec3 normal;
in vec2 uv;

out vec2 texCoord;
out vec3 vPos; 
out vec3 vNormal; 



// main function gets executed for every vertex
void main()
{
  texCoord = uv; 
  vPos = position;  
  vNormal = normalize(vec3(transpose(inverse(modelMatrix)) *vec4(normal,1.0))); 

  gl_Position = projectionMatrix * modelViewMatrix*vec4(position,1.0);
}
