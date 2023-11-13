// registrando a service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async() => {
    try {
    let reg;
    reg = await navigator.serviceWorker.register('./sw.js', {type: "module"})
    console.log('Service worker registrada! 😎', reg);
    postNews();
    }catch (err) {
    console.log('😢 Service worker registro falhou:', err);
    }
    });
    }

    var camMode = "user"
    //configurando as constraintes do video stream
    var constraints = { video: {facingMode: camMode}, audio: false};
    //capturando os elementos em tela
    const cameraView = document.querySelector("#camera--view"),
          cameraSensor = document.querySelector("#camera--output"),
          cameraTrigger = document.querySelector("#camera--trigger")
          cameraTrocar = document.querySelector("#trocar")


  cameraTrocar.onclick = function() {
   stopMediaTracks(cameraView.srcObject);
   camMode = camMode === "user" ? "environment" : "user";
   constraints = {video: {facingMode: camMode}, audio: false};
   console.log(constraints)
   cameraStart();
  } 

    //Estabelecendo o acesso a camera e inicializando a visualização
   function cameraStart(){
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream){
         track = stream.getTracks()[0];
         cameraView.srcObject = stream;
      })
      .catch(function (error){
        console.error("Ocorreu um Erro.", error);
      });
   }
   //função para tirar foto
   cameraTrigger.onclick = function (){
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataUrl("image/webp");
    cameraOutput.classList.add("taken");
   };
   //carrega imagem de camera quando a janela carregar
   window.addEventListener("load", cameraStart,false);

   function stopMediaTracks(stream){
    stream.getTracks().forEach(track => {
      track.stop();
    });
   }