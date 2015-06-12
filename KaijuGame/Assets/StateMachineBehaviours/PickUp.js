#pragma strict
import RootMotion.FinalIK;

public class PickUp extends StateMachineBehaviour{

	private var look : LookAtIK;
	private var ik : FullBodyBipedIK;

	public override function OnStateEnter(animator : Animator, stateInfo : AnimatorStateInfo, layerIndex : int){
		look = animator.GetComponent.<LookAtIK>();
		ik = animator.GetComponent.<FullBodyBipedIK>();
	}
	
	public override function OnStateUpdate(animator : Animator, stateInfo : AnimatorStateInfo, layerIndex : int){
		look.solver.bodyWeight = 1.0 - animator.GetFloat("rightHandIK");
		ik.solver.rightHandEffector.positionWeight = animator.GetFloat("rightHandIK");
	}

}
	