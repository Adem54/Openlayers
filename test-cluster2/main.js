import './style.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import Overlay from 'ol/Overlay.js';
import Feature from 'ol/Feature.js';
import Cluster from 'ol/source/Cluster.js';
import Point from 'ol/geom/Point.js';
import VectorSource from 'ol/source/Vector.js';
import {Tile as TileLayer2, Vector as VectorLayer} from 'ol/layer.js';
//ol-ext eklentisini indirmemiz gerekiyor.. 
import AnimatedCluster from "ol-ext/layer/AnimatedCluster";
import FontSymbol from 'ol-ext/style/FontSymbol';
import OverlayPopup from 'ol-ext/overlay/popup';



import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text,

} from 'ol/style.js';





let mapLayers = [
  new TileLayer({
    source: new OSM(),
  }),
];

const popup = new OverlayPopup({
 popupClass:"default anim",//"tooltips", "warning", "default", "tips", "shadow"
 closeBox:true,
 autoPan:true,
 autoPanAnimation: { duration: 100 }
});

const map = new Map({
  target: 'map',
 
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
  layers: mapLayers ,
  overlays:[popup]
});

//Bir cluster source kisaca neden olusuyor, distance, yani bunu vermemiz gerekiyor ki vermezsek bile default olarak kendisinin veridigi distance degeri mutlaka vardir,
//Ozellikle vectorsource yi sourceye option una atamam miz gerekiyor ki hangi features lari cluster uygulayacagini bilsin...bu cook onemlidir
let clusterSource = new Cluster({
  distance:75,
  source:new VectorSource()
});

//AnimatedCluster i nasil npm package ile install edip import ile opnelayes7 de kullanabilirz bunu bulmaliy iz
// let clusterLayer = new AnimatedCluster({

// })

let clusterLayer = new VectorLayer({
  name:"Cluster",
  source:clusterSource,
  style:getStyle
})
//Burasi normalde AnimatedCluster isminde bir extention i ekleyip onu kullanacaktik ama onu install edemedik ondan dolayi simdililk normal Vectorlayer kullanalim..clusterLayer icin , bu su demek hangi featuerslerimzi cluster ozelligi ile kullanacagiz.. yani point feature lerimzi

map.addLayer(clusterLayer);

// refreshData();


var styleCache = {};
function getStyle(feature,resolution){
  var featSize =  feature.get("features").length;
  var totalPopulation = 0;
  //Gruplanan feature leri burda donduruyoruz yani burda ornegin cluster ozelligi ile haritayi ilk actigmzda 2 ayri yerde 20-24 adet 2 nokta gozukuyor ise o zaman burda feature dedigi o an biz kac adet ayri ayri yuvarlak goruyorsak her birisi featureslardan olusan yani dizi olarak gelen feature dur feature derken parametreye gelen feature manasinda yook sa tek basian feature degildir feature lardan olusan dizidir parametreye gelen feature ...Her bir grup tur feature aslinda yani o feature u biz foreach ile dondururnce her bir featuremize erisebiliriz ancak ve de her bir feature miziin icerisindeki spesifik degerlere gore onlara style ayarlamasi yapabiliriz
  for(var j = 0; j < feature.get("features")[j]["population"]; j++){
    var population = parseInt(feature.get("features")[j].get("population"),10);
    totalPopulation = totalPopulation + population;
  } 
  
  var size = totalPopulation;
  var style = styleCache[size];
  if(!style){
    var color = size > 100 ? "255, 0, 0 " : size > 50 ? "243, 156, 18 " : size > 25 ? "125, 206, 160 " : size > 10 ? "0, 150, 0" : size > 0.99 ? "0, 255, 0" : "192, 192, 192";
    style = styleCache[size]  = new Style({
      image: new CircleStyle({
        radius: 10,
        stroke: new Stroke({
          color: '#fff',
        }),
        fill: new Fill({
          color:"rgba("+color+",05)"
        }),
      }),
      text: new Text({
        text: size.toString(),
        fill: new Fill({
          color: '#fff',
        }),
      }),
      zIndex:100,
    });
  }
}


let skienFeature = new Feature({
  geometry:new Point([1068935.7233506376, 8225579.575152853]),
  name:"Skien-city",
  id:3735
})
skienFeature.set("city","Skien");



const source = new VectorSource({
  features: [skienFeature],
});


const symbol = new FontSymbol({
   form: 'marker',
  glyph: 'FontAwesome:home',
  color: '#f00',
  fill: new Fill({
    color: '#fff',
  }),
  // stroke: new Stroke({
  //   color: '#000',
  // }),
  fontSize:1,
  radius:15
});

var clusterLayer2 = new AnimatedCluster({
  name:"Cluster2",
  source:clusterSource,
  animationDuration:1000,
  
})