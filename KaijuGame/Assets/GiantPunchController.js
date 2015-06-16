#pragma strict

var layer : int = 1;
var punching : boolean = false;
var rightHand : Transform;
var rayDistance : float = 5.0;
var layerMask : LayerMask;
var hitEffect : Transform;
var hitSound : AudioClip;

private var anim : Animator;
private var audioSource : AudioSource;
private var aimTarget : Transform;

function Start () {
	anim = GetComponent.<Animator>();
	audioSource = GetComponent.<AudioSource>();
	aimTarget = GameObject.FindGameObjectWithTag("SmoothAimTarget").transform;
}

function Update () {

	var currentState = anim.GetCurrentAnimatorStateInfo(layer);

	if(Input.GetButtonUp("Fire1") && !currentState.IsName("Punch")){
		anim.SetTrigger("Fire1");
	}
	
}

function LateUpdate(){
	
	if(punching){
		var hit : RaycastHit;
		var dir = aimTarget.position - rightHand.position;
		if(Physics.Raycast(rightHand.position, dir, hit, rayDistance, layerMask)){
			var newHitEffect : Transform = Transform.Instantiate(hitEffect, hit.point, Quaternion.LookRotation(hit.normal));
			punching = false;
		}		
	}
	
}

function StartPunching(){
	if(!punching){
		punching = true;
	}
}

function StopPunching(){
	if(punching){
		punching = false;
	}
}