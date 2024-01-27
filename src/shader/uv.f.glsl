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
uniform sampler2D normalTexture;
uniform bool hasNormal;
uniform vec3 light; 

out vec4 fragColor;
in vec2 texCoord;
in vec3 vPos; 
in vec3 vNormal; 



// main function gets executed for every pixel
void main()
{
  //this colors all fragments (pixels) in the same color (RGBA)
  // if (texture(textureCanv, texCoord).x == 0.0 && texture(textureCanv, texCoord).y == 0.0){
  //   fragColor= texture(textureImg, texCoord) ;
  // } 
  // else{
    fragColor= texture(textureCanv, texCoord)+ texture(textureImg, texCoord) ; 
  
}
