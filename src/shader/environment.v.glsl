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



// default vertex attributes provided by Geometry and BufferGeometry
in vec3 position;
in vec3 normal;
in vec2 uv;

out vec3 texCoord;



// main function gets executed for every vertex
void main()
{

  vec3 n = normalize(vec3(transpose(inverse(modelMatrix)) *vec4(normal,1.0))); 
  vec3 v = cameraPosition - position;
  vec3 r = vec3(2.*dot(n,v)*n.x, 2.*dot(n,v)*n.y,2.*dot(n,v)*n.z) - v; 



  gl_Position = projectionMatrix * modelViewMatrix*vec4(position,1.0);
  texCoord = r; 
}
