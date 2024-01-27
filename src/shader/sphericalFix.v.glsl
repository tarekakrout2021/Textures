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

#define PI 3.141592

// default vertex attributes provided by Geometry and BufferGeometry
in vec3 position;
in vec3 normal;
in vec2 uv;

// out vec2 texCoord;
out vec3 texCoord;


// main function gets executed for every vertex
void main()
{
  //gl_Position = vec4(0., 0., 0., 1.0);
  gl_Position = projectionMatrix * modelViewMatrix*vec4(position,1.0);
  // float u =  1.0 -(PI + atan(position.z,position.x))/(2.0*PI);
  // float v = 1.0 - atan(sqrt(position.x*position.x+position.z*position.z),position.y)/PI;
  // texCoord = vec2(u,v);
  texCoord = position; 
}
