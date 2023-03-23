import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import TileSource from 'ol/source/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
//Layer source for the OpenStreetMap tile server.
import LayerSwitcher from 'ol-layerswitcher';
import LayerGroup from 'ol/layer/Group.js';
import MousePosition from 'ol/control/MousePosition.js';
import {format} from 'ol/coordinate.js';
import ScaleLine from 'ol/control/ScaleLine.js';
import Overlay from 'ol/Overlay.js';
import $ from "jquery";
import Control from 'ol/control/Control.js';



let mapView =new View({
  center: fromLonLat([78.766032, 23.7662398]),
  zoom: 4.5
});
const map = new Map({
  target: 'map',
  // layers: [
  //   new TileLayer({
  //     source: new OSM()//OSM demek Open Street Map demektir
  //   })
  // ],
  view: mapView,
  controls:[]
});

//BESTPRCTISE..HEM GROUP YAPIYORUZ HEM DE TYPE KULLANGIMZ ICIN RADIO BUTTON OLARAK GOSTERILECEKTIR MAP TE, EGER TYPE KULLANMAZ ISEK O ZAMAN DA CHECKBOX OLARK GOSTERECEK... RADIO BUTTON FONKSIYONUNU TYPE OPTION I ILE SAGLIYORUZ
let noneTile = new TileLayer({
  title:"None",
  type:"base",
  visible:false
});

let osmTile = new TileLayer({
  title:"Open Street Map",
  type:"base",
  visible:true,
  source:new OSM()
});
//map.addLayer(osmTile);

//Creating Group layer 
//ol/layer/Group~LayerGroup
let baseLayerGroup = new LayerGroup({
  title:"Base Maps",
  fold:"close",//false da olablir
  layers:[
    noneTile,osmTile
  ]
});

map.addLayer(baseLayerGroup);

map.on("click",function(event){
  console.log(event.coordinate);
})

//IndiaStateBoundary7Tile
let IndiaAdm1StateTile = new TileLayer({
  title:"India States",
  source:new TileWMS({//WMS-geoserver dan gelen-Layer source for tile data from WMS servers.
url:"http://localhost:8080/geoserver/geo-demo/wms",
//url ile geoserver dan fetch edecegiz data kaynagini
//geoserver da layerpreview dan hazirladigmz layer lardan indiastateboundary4 u openlayers da tiklayarak acariz ve o map i goruntuleriz ve o acilan adres cubugundaki url in wms e olan kismini kopyalariz
params:{"LAYERS":"	geo-demo:ind_adm11","TILED":true},
//hangi geoserver da hangi layer i kullanacagmiz i belli etmek icin params kullaniyoruz. params a biz geoserver da previewlayer yaptiktan sonra gelen sayfadaki Name olarak hangisni kullaniyorsak onu yaziyourz
//geoserver in wms server ini kullaniyoruz, consume ediyoruz
serverType:"geoserver",

visible:true
  })
});

//polbnda_ind_pg4
let IndiaPolbnda_Ind_Pg4Tile = new TileLayer({
  title:"India Districts",
  source:new TileWMS({//WMS-geoserver dan gelen-Layer source for tile data from WMS servers.
url:"http://localhost:8080/geoserver/geo-demo/wms",
//url ile geoserver dan fetch edecegiz data kaynagini
//geoserver da layerpreview dan hazirladigmz layer lardan indiastateboundary4 u openlayers da tiklayarak acariz ve o map i goruntuleriz ve o acilan adres cubugundaki url in wms e olan kismini kopyalariz
params:{"LAYERS":"geo-demo:polbnda_ind_pg","TILED":true},
//hangi geoserver da hangi layer i kullanacagmiz i belli etmek icin params kullaniyoruz. params a biz geoserver da previewlayer yaptiktan sonra gelen sayfadaki Name olarak hangisni kullaniyorsak onu yaziyourz
//geoserver in wms server ini kullaniyoruz, consume ediyoruz
serverType:"geoserver",
visible:true
  })
});


// map.addLayer(IndiaPolbnda_Ind_Pg4Tile);
// map.addLayer(IndiaAdm1StateTile);

let overlayLayerGroup = new LayerGroup({
  title:"Overlays",
 // fold:true,
  fold:"open",
  layers:[
    IndiaPolbnda_Ind_Pg4Tile,IndiaAdm1StateTile
  ]
});

map.addLayer(overlayLayerGroup);


//layer lardan hangisi en altta eklenirse o en uste gelecektir bunu bilelim yani su anda en ustte IndiaAdm1StateTile gozukecektir ve biz layerlarimiz arasidna priority da yapabiliyoruzo....
//Geo server dan alacagimz datalarimiz WMS geoserver tile dir

//KULLANILAN DATABASE-TABLES BILGILERI
//POSTGRES SQL- dbname=test2 - GeoServer da store=geo-demo
//Tables = india_state_boundary_pg - geo-demo:india_state_boundary_pg7 / polbnda_ind_pg - geo-demo:polbnda_ind_pg4

/*
Adding Layer Switcher in Web Map Application
*/


var layerSwitcher = new LayerSwitcher({
  reverse: true, // Reverses layer order in the switcher
  groupSelectStyle: 'group', // Select style for groups: 'none', 'children', 'group' (default)
  activationMode: 'click', // Switcher activation mode: 'click' or 'hover' (default)
  startActive:false // Whether the switcher should start active or not (default is false)-false means when we open the application it will not be active
});

 map.addControl(layerSwitcher);

//Switch -manuel
//switch islemi icin bir fonksiyon olusturuyoruz
//internal-event handler hata veriyor timing den dolayi yani,, html yuklendiginde hala javascript yuklenmedigi icin  tanimiyor

// let checkBoxes = document.querySelectorAll("input[type='checkbox']");
// checkBoxes.forEach(element => {
//       element.addEventListener("click",showCheckedLayer);
// });

// function showCheckedLayer(event){
//   let layername = event.target.value;
//   let checkedStatus = event.target.checked;
//   let layerList = map.getLayers();
//   layerList.forEach(layer=>{
//     if(layer.get("title") == layername){
//       layer.setVisible(checkedStatus);
//     }
//   })
// }

//MOUSE POSITION CURSOR AYARLAMAK
//ol/control/Control~Control
//Subclasses
// Attribution
// FullScreen
// MousePosition ** 
// OverviewMap
// Rotate
// ScaleLine
// ZoomSlider
// ZoomToExtent
// Zoom

//ol/control/MousePosition~MousePosition

// coordinateFormat option una tiklarsak CoordinateFormat fonksiyonunu kullanabilecgeimzi gorebiliriz....
//  CoordinateFormat() coordinate.js, line 14
// A function that takes a Coordinate and transforms it into a {string}.
//Burda biz projectin olarak "ESPG:4326" YAPTIGMIZ ICIN ARTIK COORDINATE FORMATIINI DA LONGTITUDE OG LATITUDE OLARAK ALMAMIZ GEREKECEK
//COORDINATE X-LATITUDE Y-LONGTITUDE YE KARSILIK GELIR
/*
import {format} from 'ol/coordinate.js';
const coord = [7.85, 47.983333];
const template = 'Coordinate is ({x}|{y}).'; normalde dokumantasyonda bu sekilde geliyor ancak biz burda eger EPSG:4326 PROJECKSIIYONUNA CEVIRIRKEN BIZM X VE Y NIN YERINI DEGISTIRMEMIZ GEREKIR BUNU BILMEK COK ONEMLI VE KRITIKTIR....Y-ILK ONCE GELIR-LONGTITUDE E KARSILIK X -LATITUDE E KARSILK OLARAK 2. GELIR
const out = format(coord, template, 2);
// out is now 'Coordinate is (7.85|47.98).'

*/

let digitNumber= 6;//virgulden sonra kac basamak gelsin longtitude ve latitude ye cevrilince

//mousePosition controller default olarak sag ustte geliyor ama biz onu sag ustte degil de sag veya sol altta goremek isteyebilirz boyle durumlarda da class option ini kullanarak istedgimz yerde verdigmz class a style vererek konumlandirabilirz
let mousePosition = new MousePosition({
  className:"mousePosition",
  projection:"EPSG:4326",
  coordinateFormat:function (coordinate){return format(coordinate,'{y} , {x}',digitNumber) }
})

map.addControl(mousePosition);//Artik sag ustte surekli olarak biz mausumuzu gezidridigmiz yerin longtitude-latitude sinin dinamik olarak gosterildgiini gorebiliriz.... 

//ADD-SCALELINE CONTROL... 
//ol/control/ScaleLine~ScaleLine

let scaleLineControl = new ScaleLine({
bar:true,
text:true
});
//bar,text true olunca line artik bar olarak gelecektir
map.addControl(scaleLineControl);
//Bu sekilde ekleigmizde sol altta scale-line buyukluk cubugu yani zoom-in/zoom-out yaptikca ne kadar uzakliktan harita verilerini gordugmuz u veren deger degisecektir

//DEVELOP FEATURE-INFO POPUP IN WEB MAPPING APPLICATION - POPUP DENILDIGI ZAMAN AKLA OVERLAY GELMELIDIR

//ol/Overlay~Overlay

let container = document.querySelector("#popup");
let content = document.querySelector("#popup-content");
let closer = document.querySelector("#popup-closer");

let popupOverlay = new Overlay({
  element:container,
  /* animatinon olsun istiyorsak popuup acilirken o zaman autoPan true yapip animasyon ayarlarini yapariz */
  autoPan:true,
  autoPanAnimation:{
    duration:250
  },
});

map.addOverlay(popupOverlay);

closer.addEventListener("click",closerCallback);

function closerCallback(){
  popupOverlay.setPosition(undefined);//closer ile popup kapatilirken position undefined  yapilirak default haline dondurulerek kapatilir
  closer.blur();
  return false;
}
//HTML DOM Element blur() -  Remove focus from a text field: - document.getElementById("myText").blur();

//start Home control 
let homeButton = document.createElement("button");
homeButton.className = "myButton";
homeButton.innerHTML = `<img src='resources/images/home.png' alt='' style='width:30px; height:30px; cursor:pointer;
background-color:cyan;    vertical-align:middle'></img>  `;
let homeElement = document.createElement("div");
homeElement.className = "homeButtonDiv";
homeElement.appendChild(homeButton);

//CUSTOM CONTROL YAPTIGMIZ ICIN NEW CONTROL ILE OLUSTURUYORUZ... 
//ol/control/Control~Control - import Control from 'ol/control/Control.js';
//This is the base class for controls. You can use it for simple custom controls by creating the element with listeners, creating an instance: const myControl = new Control({element: myElement}); and then adding this to the map.

let homeControl = new Control({
  element:homeElement
});

homeButton.addEventListener("click", ()=>{
  location.href="index.html";//tiklaninca index.html i render ederek default haline getirecek
});

map.addControl(homeControl);

//end home control

//ADDING FULLSCREEN CONTROL 
//start:full screen control

let fsButton =  document.createElement("button");
fsButton.className = "myButton";
fsButton.innerHTML = `<img src='resources/images/full-screen.png' alt='' style='width:30px; height:30px; cursor:pointer;
background-color:cyan;    vertical-align:middle; margin-left:14px; '></img>  `;

let fsElement = document.createElement("div");
fsElement.className = "fsButtonDiv";
fsElement.appendChild(fsButton);
homeElement.appendChild(fsButton);

let fsControl = new Control({
  element:fsElement
})

//Bu custom control icerisinde yaparken fullscreen control ozellgiini openlayers dan degil, javascrip windows apisinden gelen ozellik uzerinen yapiyor..buraya dikkat edelim.. 
//The Element.requestFullscreen() method issues an asynchronous request to make the element be displayed in fullscreen mode.
//Element.requestFullscreen()
//Bu addEventListener da olan olayin openlayers ile hic ilgisi yok... tamamen javascript-windows api
fsButton.addEventListener("click", ()=>{
  let mapElement = document.getElementById("map");
  if (mapElement.requestFullscreen) {
    mapElement.requestFullscreen();
  } else if (mapElement.msRequestFullscreen) {
    mapElement.msRequestFullscreen();
  } else if (mapElement.mozRequestFullScreen) {
    mapElement.mozRequestFullScreen();
  } else if (mapElement.webkitRequestFullscreen) {
    mapElement.webkitRequestFullscreen();
  }
});

map.addControl(fsControl);

//FEATURE-INFO CONTROLLL 
//start feature info controll
let featureInfoButton = document.createElement('button');
featureInfoButton.className = "myButton";
featureInfoButton.id = "featureInfoButton";
featureInfoButton.innerHTML = `<img src='resources/images/info.png' alt='' style='width:30px; height:30px; cursor:pointer;
background-color:cyan;    vertical-align:middle; margin-left:14px;'></img>  `;

let featureInfoElement = document.createElement('div');
featureInfoElement.className = "featureInfoDiv";
featureInfoElement.appendChild(featureInfoButton);
homeElement.appendChild(featureInfoButton);

let featureInfoControl =  new Control({
  element:featureInfoElement
});

let featureInfoFlag = false;
featureInfoButton.addEventListener("click", ()=>{
  featureInfoButton.classList.toggle("clicked");
  featureInfoFlag = !featureInfoFlag;
});

map.addControl(featureInfoControl);

//end feature info controll

//Map te tiklaigmiz nokta da popup olusacagi icin once map e tiklandiginda olusacak olan event tetiklendiginde yapilacaklari olustururuz
map.on("singleclick",function(event){
  if(featureInfoFlag){//Sadece featureInfoFlag true oldugunda bize popup i gosterecek ...
    content.innerHTML = '';
    let resolution = mapView.getResolution();//resolution i kullanacagimz icin almamiz gerekiyor
  
    let url = IndiaAdm1StateTile.getSource().getFeatureInfoUrl(event.coordinate, resolution, 'EPSG:3857',{
      'INFO_FORMAT':'application/json',//datayi hangi formatta alacagiz
      'propertyName':'name_1,type_1'//hangi kolonlari alacagiz.. bu source den
    });
  
    if(url){// if url is valid
      $.getJSON(url,function(data){
        
        let feature = data.features[0];
       
        let properties = feature.properties;
        console.log("properties:",properties);
        content.innerHTML = '<h3>State: </h3> <p>'+ properties.name_1.toUpperCase() +'</p><br> <h3>Type: </h3> <p>'+ properties.type_1.toUpperCase() +'</p>';
  
        popupOverlay.setPosition(event.coordinate);
      })
    }else{
      popupOverlay.setPosition(undefined);//Eger url yok ise o zaman demektir ki bu almak istdimgiz haritamiz disinda bir alana tiklanmistir o zaman da hicbirsey gosterme default haline gec diyoruz
    }
  }

})

//autoPan	PanIntoViewOptions | boolean (defaults to false)	
// Pan the map when calling setPosition, so that the overlay is entirely visible in the current viewport.
//PanIntoViewOptions a tiklanirsa 
//PanIntoViewOptions{Object}
/*

PanIntoViewOptions{Object}
Properties:
Name	Type	Argument	Default	Description
animation	PanOptions	<optional>
{}	
The animation parameters for the pan

margin	number	<optional>
20	
The margin (in pixels) between the overlay and the borders of the map when panning into view.

PanOptions{Object}
Properties:
Name	Type	Argument	Default	Description
duration	number	<optional>
1000	
The duration of the animation in milliseconds.

easing	function	<optional>
The easing function to use. Can be one from ol/easing or a custom function. Default is inAndOut.

Positioning{'bottom-left'} {'bottom-center'} {'bottom-right'} {'center-left'} {'center-center'} {'center-right'} {'top-left'} {'top-center'} {'top-right'}
The overlay position: 'bottom-left', 'bottom-center', 'bottom-right', 'center-left', 'center-center', 'center-right', 'top-left', 'top-center', or 'top-right'.

*/

//CUSTOM CONTROLS IN OPENLAYERS
//HOME CONTROL-FEATURE INFO CONTROL-FULLSCREEN CONTROL
//HOME CONTROL=> MAP IMZI DEFAULT DURUMA GETIRECEK ZOOM DEGERLERI OLARAK YANI KULLANICI ZOOM IN IN YAPTI HOME A BASTI TEKRAR SAYFA ILK ACILDIGI HALINE DONECEK MAPIMIZ
//FULLSCREEN CONTROL=> ADI USTUNDE MAPIMIZI FULLSCREEN YAPACAK
//FEATURE-INFO CONTROLL=>UZERINE TIKLAYINCA FEATURE-CONTROL YESIL-AKTIF RENK OLACAK VE ARTIK MAPIMIZ UZERINDE TIKLADIMIGZ ALAN ILE ILGILI DETAYLI BILGI POPUP DA GOSTEREECEK AMA FEATURE-INFO CONTROLE TIKLANMADAN GOSTERMEYECEK

//SUNU BILELIM DEFAULT OLARAK GELEN CONTROLS LERIMIZ VAR ZOOM IN-ZOOM OUT GIBI
//DEFAULT OLAN CONTROLS LERI ONCELIKLE KALDIRAGIZ BUNU YAPABILMEK ICIN, CONTROLS U MAP ICINDEKI BILESENLERDE KULLANCAGIZ 
//ONCELIKLE CONTROLS UN MAP A AIT TEMEL BILESENLERDEN OLDUGUNU BILMELIYIZ... VE DIRE MAP ICINDE TARGET,VIEW,LAYERS GIBI KULLANABILIOURZ VE EXTEND EDEBILIYORUZ DEFAULT OLARAK GELEN CONTROLS LERI DISABLED YAPABILIYOURZ VE DAHA BIR COK CUSTOMIZATION ISLEMLERI YAPABILIYORUZ
//controls:[] bu sekilded map icinde bos bir dizi olarak kullaninca zaten default olarak gelen zoom-in-zoom-out gibi controller kaldirilacaktir
/*
const map = new Map({
  target: 'map',
  // layers: [
  //   new TileLayer({
  //     source: new OSM()//OSM demek Open Street Map demektir
  //   })
  // ],
  view: mapView,
  controls:[]
});

*/

//full-screen icona tiklayinca fullscreen olurken, esc ye basinca normal position a geliyor

//FULLSCREEN ILE ILGILI OPENLAYERS IN KENDI ICERISINDEKI FULLSCREEN CONTROL INBUILD CLASS UZERINDEN DE YAPABILIRIZ 
//https://openlayers.org/en/latest/examples/full-screen.html
//import {FullScreen, defaults as defaultControls} from 'ol/control.js';

//end:full screen control


