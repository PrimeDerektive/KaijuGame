#pragma strict
import RootMotion.FinalIK;

var target : Transform;
var look : LookAtIK;
var ik : FullBodyBipedIK;

function Start(){
	look.Disable();
	ik.Disable();
}

function LateUpdate(){
	look.solver.Update();
	ik.solver.Update();
	
}