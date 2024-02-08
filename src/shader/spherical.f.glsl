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
in vec2 texCoord;


// main function gets executed for every pixel
void main()
{
  fragColor= texture(textureCanv, texCoord)+ texture(textureImg, texCoord) ; 

}
