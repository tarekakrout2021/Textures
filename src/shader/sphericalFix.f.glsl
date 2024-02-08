// defines the precision
precision highp float;

// we have access to the same uniforms as in the vertex shader
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


uniform sampler2D textureImg;
uniform sampler2D textureCanv;
out vec4 fragColor;
// in vec2 texCoord;
in vec3 texCoord;
#define PI 3.141592


// main function gets executed for every pixel
void main()
{
  float x = texCoord.x; 
  float y = texCoord.y; 
  float z = texCoord.z; 
  float u =  1.0 -(PI + atan(z,x))/(2.0*PI);
  float v = 1.0 - atan(sqrt(x*x+z*z),y)/PI;

  fragColor= texture(textureCanv, vec2(u,v))+ texture(textureImg, vec2(u,v)) ;
}
