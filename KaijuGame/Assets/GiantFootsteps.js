﻿#pragma strict

var maxShakeIntensity : Vector3 = Vector3(2.5, 2.5, 2.5);
var footstepSound : AudioClip;
private var minTimeBetweenSteps : float = 1.0;

private var nextStepAllowed : float = 0.0;

private var audioSource : AudioSource;
private var anim : Animator;
private var camAnchor : GameObject;

function Start(){
	audioSource = GetComponent.<AudioSource>();
	anim = GetComponent.<Animator>();
	camAnchor = GameObject.FindGameObjectWithTag("CameraAnchor");
}

function Update(){
	var footsteps : float = anim.GetFloat("footsteps");
	if(footsteps > 0.95 && Time.time > nextStepAllowed){
		Footstep("something");
		nextStepAllowed = Time.time + minTimeBetweenSteps;
	}
}


function Footstep(foot : String){
	audioSource.pitch = Random.Range(0.85, 1.0);
	var distance = Vector3.Distance(camAnchor.transform.position, transform.position);
	var shakeIntensityModifier = 1.0 - (distance/audioSource.maxDistance);
	shakeIntensityModifier = Mathf.Clamp(shakeIntensityModifier, 0.0, 1.0);
	iTween.PunchRotation(camAnchor, maxShakeIntensity*shakeIntensityModifier, 1.5);
	audioSource.PlayOneShot(footstepSound);
}