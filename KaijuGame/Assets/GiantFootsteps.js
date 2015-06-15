#pragma strict

var maxShakeIntensity : Vector3 = Vector3(2.5, 2.5, 2.5);
var footstepSound : AudioClip;
var layerMask : LayerMask;
private var minTimeBetweenSteps : float = 1.0;
var rightFoot : Transform;
var leftFoot : Transform;
var dustCloud : Transform;

private var nextStepAllowed : float = 0.0;

private var audioSource : AudioSource;
private var anim : Animator;
private var camAnchor : GameObject;

function Start(){
	audioSource = GetComponent.<AudioSource>();
	anim = GetComponent.<Animator>();
	camAnchor = Camera.main.gameObject;
}

function Update(){
	
	var leftFootstep : float = anim.GetFloat("leftFootstep");
	if(leftFootstep > 0.75 && Time.time > nextStepAllowed){
		Footstep(leftFoot);
		nextStepAllowed = Time.time + minTimeBetweenSteps;
	}
	
	var rightFootstep : float = anim.GetFloat("rightFootstep");
	if(rightFootstep > 0.75 && Time.time > nextStepAllowed){
		Footstep(rightFoot);
		nextStepAllowed = Time.time + minTimeBetweenSteps;
	}
	
}


function Footstep(footToUse : Transform){
	audioSource.pitch = Random.Range(0.85, 1.0);	
	var newDust = Transform.Instantiate(dustCloud, footToUse.position, footToUse.rotation);
	var distance = Vector3.Distance(camAnchor.transform.position, transform.position);
	var shakeIntensityModifier = 1.0 - (distance/audioSource.maxDistance);
	shakeIntensityModifier = Mathf.Clamp(shakeIntensityModifier, 0.0, 1.0);
	CameraShakeManager.instance.Shake(maxShakeIntensity*shakeIntensityModifier, 1.5);
	audioSource.PlayOneShot(footstepSound);
}