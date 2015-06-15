#pragma strict

var fireRate : float = 0.12;
var bulletSpread : float = 0.03;
var range : float = 500.0;
var barrel : Transform;
var tracerPrefab : GameObject;
var layerMask : LayerMask;
var hitEffect : Transform;

var singleShotSound : AudioClip;
var falloffSound : AudioClip;
var muzzleFlash : GameObject;
var muzzleFlashAudio : AudioSource;

private var nextFire : float = 0.0;
private var fireDownTime : float = 0.0;
private var firing : boolean = false;

private var aimTarget : Transform;
private var cam : GameObject;

function Start(){
	aimTarget = GameObject.FindGameObjectWithTag("AimTarget").transform;
	cam = Camera.main.gameObject;
}

function Update(){
	
	if(Input.GetButtonDown("Fire1") && !firing){
		muzzleFlash.SetActive(true);
		muzzleFlashAudio.Play();
		fireDownTime = Time.time;
		firing = true;
	}
	
	if(Input.GetButtonUp("Fire1") && firing){
		muzzleFlashAudio.Stop();
		var soundToPlay : AudioClip = falloffSound;
		if(Time.time - fireDownTime < fireRate) soundToPlay = singleShotSound;
		muzzleFlashAudio.PlayOneShot(soundToPlay);
		muzzleFlash.SetActive(false);		
		firing = false;
	}
	
	if(firing && Time.time > nextFire){
	
		barrel.LookAt(aimTarget);
		var spreadModifier = Vector3(Random.Range(-bulletSpread, bulletSpread), Random.Range(-bulletSpread, bulletSpread), 0);
		barrel.forward += spreadModifier;
		var newTracer = GameObject.Instantiate(tracerPrefab, barrel.position, barrel.rotation);
		
		var hit : RaycastHit;
		if(Physics.Raycast(barrel.position, barrel.forward, hit, range, layerMask)){
			var newHitEffect : Transform = Transform.Instantiate(hitEffect, hit.point, Quaternion.LookRotation(hit.normal));
		}
		
		CameraShakeManager.instance.Shake(Vector3(1.25, 0.5, 0.5), 0.6);
		
		nextFire = Time.time + fireRate;
	}
	
}