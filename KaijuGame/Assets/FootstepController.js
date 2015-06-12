#pragma strict

var rayDistance : float = 0.1;
var layerMask : LayerMask;
var minTimeBetweenSteps : float = 0.5;

var grounded : boolean = true;

private var lastFrameGrounded : boolean = true;
private var nextStepAllowed : float = 0.0;


function Update () {

	if(Physics.Raycast(transform.position, -Vector3.up, rayDistance, layerMask)){
		grounded = true;
		if(!lastFrameGrounded){
			DoFootstep();
		}
	}
	else{
		grounded = false;
	}
	
	lastFrameGrounded = grounded;

}

var maxShakeIntensity : Vector3 = Vector3(2.5, 2.5, 2.5);
var footstepSound : AudioClip;

private var audioSource : AudioSource;
private var camAnchor : GameObject;

function Start(){
	audioSource = GetComponent.<AudioSource>();
	camAnchor = GameObject.FindGameObjectWithTag("CameraAnchor");
}


function DoFootstep(){
	if(Time.time < nextStepAllowed) return;
	audioSource.pitch = Random.Range(0.85, 1.0);
	var distance = Vector3.Distance(camAnchor.transform.position, transform.position);
	var shakeIntensityModifier = 1.0 - (distance/audioSource.maxDistance);
	shakeIntensityModifier = Mathf.Clamp(shakeIntensityModifier, 0.0, 1.0);
	iTween.PunchRotation(camAnchor, maxShakeIntensity*shakeIntensityModifier, 1.5);
	audioSource.PlayOneShot(footstepSound);
	var nextStepAllowed = Time.time + minTimeBetweenSteps;
}