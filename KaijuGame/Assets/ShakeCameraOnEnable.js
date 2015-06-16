#pragma strict

var amount : Vector3 = Vector3(1.0, 1.0, 1.0);
var duration : float = 1.0;

function OnEnable(){
	CameraShakeManager.instance.Shake(amount, duration);	
}