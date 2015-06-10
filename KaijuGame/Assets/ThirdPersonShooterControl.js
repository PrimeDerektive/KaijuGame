#pragma strict

var dampTime : float = 0.2;

private var anim : Animator;
private var cam : Transform;
private var aimPos : Vector3;

function Start () {
	anim = GetComponent.<Animator>();
	cam = Camera.main.transform;
}

function Update () {
	
	var speedX = Input.GetAxis("Horizontal");
	var speedY = Input.GetAxis("Vertical");
	anim.SetFloat("speedX", speedX, dampTime, Time.deltaTime);
	anim.SetFloat("speedY", speedY, dampTime, Time.deltaTime);	
	
	var targetDir = cam.forward;
	targetDir.y = transform.forward.y; //kill Y so we only rotate on Y axis
	var angleDifference = Utilities.FindTurningAngle(transform.forward, targetDir);
	anim.SetFloat("direction", angleDifference);
	
	var currentState = anim.GetCurrentAnimatorStateInfo(0);
	if(currentState.IsName("TurnRight") || currentState.IsName("TurnLeft") ||speedX > 0.1 || speedY > 0.1 || speedX < -0.1 || speedY < -0.1)	
		transform.forward = Vector3.Lerp(transform.forward, targetDir, Time.deltaTime*5.0);	
		
	aimPos = cam.position + cam.forward * 50.0;
	
}

function OnAnimatorIK(){
	anim.SetLookAtWeight(1.0, 0.4, 0.75, 0.0, 0.5);
	anim.SetLookAtPosition(aimPos);
}