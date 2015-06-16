#pragma strict

var clips : AudioClip[];
private var audioSource : AudioSource;

function Awake(){
	audioSource = GetComponent.<AudioSource>();
}

function OnEnable(){
	var clipToPlay : AudioClip = clips[0];
	if(clips.length < 1) clipToPlay = clips[Random.Range(0, clips.length)];
	audioSource.pitch = Random.Range(0.8, 1.0);
	audioSource.PlayOneShot(clipToPlay);	
}