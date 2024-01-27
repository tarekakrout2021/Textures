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
  
  vec4 normal = texture(normalTexture,texCoord);
  vec3 normal2 = vec3(normal.x,normal.y,normal.z);
  normal2 = 2.*(normal2 -0.5);


  vec3 n = vNormal;
  vec4 color = texture(textureImg, texCoord);
  // vec3 l = light - vPos;
  vec3 l = vec3(1.,1.,2.) - vPos;
  float res = dot(normalize(l), normalize(n));
  float res2 = dot(normalize(l), normalize(normal2));
  if ( res < 0.){
    res = 0.;
  }
  if ( res2 < 0.){
    res2 = 0.;
  }
  fragColor = vec4 (color.x*res + color.x*res2 +  0.2*color.x,
                    color.y*res + color.y*res2 +  0.2*color.y,
                    color.z*res + color.z*res2 +  0.2*color.z,
                    1.) ;
  fragColor = fragColor ;
  


  
}
