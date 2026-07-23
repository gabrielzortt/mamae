import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore, doc, setDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = {
apiKey: "AIzaSyBt2_hFx7ppxdqchzOhmMWXFrsKXsORy5U",
authDomain: "mamae-6ced3.firebaseapp.com",
projectId: "mamae-6ced3",
storageBucket: "mamae-6ced3.appspot.com",
messagingSenderId: "783662269266",
appId: "1:783662269266:web:bd7dd7e5f31c13801ff08b",
measurementId: "G-QMPJJ45C50"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

document.getElementById("login-form").addEventListener("submit",async(e)=>{
  e.preventDefault();
  const email=document.getElementById("email").value;
  const senha=document.getElementById("senha").value;
  try{
    await signInWithEmailAndPassword(auth,email,senha);
    document.getElementById("admin-panel").style.display="block";
    document.getElementById("login-form").style.display="none";
  }catch(err){alert("Erro: "+err.message);}
});

document.getElementById("logout-btn").addEventListener("click",async()=>{
  await signOut(auth);
  document.getElementById("admin-panel").style.display="none";
  document.getElementById("login-form").style.display="block";
});

// Salvar conteúdo
document.getElementById("salvar-site").addEventListener("click",async()=>{
  let bannerFile = document.getElementById("banner-img").files[0];
  let bannerPath = "";
  if(bannerFile){
    const storageRef = ref(storage,"banners/"+bannerFile.name);
    await uploadBytes(storageRef,bannerFile);
    bannerPath = "banners/"+bannerFile.name;
  }
  await setDoc(doc(db,"site","conteudo"),{
    banner:document.getElementById("banner-texto").value,
    apresentacao:document.getElementById("apresentacao-texto").value,
    rodape:document.getElementById("rodape-texto").value,
    bannerImagem:bannerPath
  });
  alert("Conteúdo salvo!");
});

// Adicionar produto
document.getElementById("add-produto").addEventListener("click",async()=>{
  let imgFile=document.getElementById("produto-imagem").files[0];
  let imgPath="";
  if(imgFile){
    const storageRef=ref(storage,"produtos/"+imgFile.name);
    await uploadBytes(storageRef,imgFile);
    imgPath="produtos/"+imgFile.name;
  }
  await addDoc(collection(db,"produtos"),{
    nome:document.getElementById("produto-nome").value,
    descricao:document.getElementById("produto-descricao").value,
    preco:document.getElementById("produto-preco").value,
    imagem:imgPath
  });
  alert("Produto adicionado!");
});

// Adicionar vídeo
document.getElementById("add-video").addEventListener("click",async()=>{
  await addDoc(collection(db,"videos"),{link:document.getElementById("video-link").value});
  alert("Vídeo adicionado!");
});
