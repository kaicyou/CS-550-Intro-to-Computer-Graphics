#version 330 compatibility

//lighting
uniform float uKa, uKd, uKs; // coefficients of each type of lighting
uniform vec3 uColor; // object color
uniform vec3 uSpecularColor; // light color
uniform float uShininess; // specular exponent
uniform float uS0, uT0;
uniform float Ds, Dt;
uniform float uSize;
in vec2 vST; // texture cords
in vec3 vN; // normal vector
in vec3 vL; // vector from point to light
in vec3 vE; // vector from point to eye

void main( )
{
	//lighting
	vec3 Normal = normalize(vN);
	vec3 Light = normalize(vL);
	vec3 Eye = normalize(vE);
	
	vec3 myColor = uColor;

	float d = max( dot(Normal,Light), 0. ); // only do diffuse if the light can see the point
	vec3 diffuse = uKd * d * uColor;
	float s = 0.;
	if( dot(Normal,Light) > 0. ) // only do specular if the light can see the point
	{
		vec3 ref = normalize( reflect( -Light, Normal ) );
		s = pow( max( dot(Eye,ref),0. ), uShininess );
	}
	vec3 specular = uKs * s * uSpecularColor;
	if( uS0+Ds-uSize/2. <= vST.s && vST.s <= uS0-Ds+uSize/2. && uT0+Dt-uSize/2. <= vST.t && vST.t <= uT0-Dt+uSize/2. )
	{
		myColor = vec3( 0.8, 0.2, 0.2 );
	}
	vec3 ambient = uKa * myColor;
	gl_FragColor = vec4( ambient + diffuse + specular, 1. );
}