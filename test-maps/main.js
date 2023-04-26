import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS.js';
import {fromLonLat} from 'ol/proj';
import LayerGroup from 'ol/layer/Group.js';
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS.js';
import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';


//https://kartkatalog.geonorge.no/metadata/terreng-norgeskart-wms/b85de734-b9b4-4719-ad80-fe55ee7415d2
const parser = new WMTSCapabilities();
let  terrengNorweiganMapWMTS ;

fetch('data/WMTSCapabilities.xml')
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    const result = parser.read(text);
    const options = optionsFromCapabilities(result, {
      layer: 'norgeskart_bakgrunn',
      matrixSet: 'EPSG:3857',
    });

  terrengNorweiganMapWMTS = new TileLayer({
    opacity: 1,
      source: new WMTS(options),
  visible:false,
  title:"terrengNorweiganMapWMTS"
})
/*
https://kartkatalog.geonorge.no/metadata/terreng-norgeskart-wms/b85de734-b9b4-4719-ad80-fe55ee7415d2
WMTS de ise bize verilen siteye girdgimz zaman orda bize WMTS source  icin bir url verilecek ona tikladgimz zaman o bize 1 tane WMTSCapabilities.xml dosyasi download eder o dosyayi aliriz ve o dosyayi openlayers projmeiz icerisinde data isminde klasor altina yerlestiririz ve o dosyaya fetch ile request gondeririz ve ordan gelen responsu alarak options larimizi elde ederiz ve bu options lari alip WMTS source icerisinde kullanriz....
*/



    let view =new View({
  //   projection:projection,
  //   center: [0, 0],
     center:fromLonLat([10.7522, 59.9139]),
     zoom: 5
   });
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
      visible:true,
      title:"OSM"
    })
  ],
  view,
});


// const openstreetMapStandart = new TileLayer({
//   source: new OSM(),
//   visible:true,
//   title:"OSM"
// });

//https://kartkatalog.geonorge.no/metadata/planomraade-wms/d70cedfc-fdb2-45cc-a9c6-0b7f09a1e746
const planAreaWMS = new TileLayer({
  source:new TileWMS({
    url:"https://openwms.statkart.no/skwms1/wms.planomraade?",
    crossOrigin: 'anonymous',
    	params: {
					LAYERS: 'PLANOMRADE_WMS',    
          FORMAT:'image/png',
					VERSION: '1.1.0',
				}
//Layers ile Version i ve de url i kullanmazsak planAreaWMS source ye erisemiyoruz...COOK ONEMLI...
// Countries have transparency, so do not fade tiles:
//  transition: 0,
  }),
  visible:false,
  title:"planAreaWMS"
})

 //map.addLayer(planAreaWMS);

/*
bize verilen url adresine tiklayinca o bizi bize bu wms e ait openlayers icinde kullanacagimiz bilgileri veren, xml sayfasini acar ve o xml sayfasinin ozellikle ilk satirindaki genel bilgi kismini iyi  okuyalim.. 
Burda ozellikle 
http://www.opengis.net/sld http://schemas.opengis.net/sld/1.1.0/sld_capabilities.xsd http://mapserver.gis.umn.edu/mapserver https://openwms.statkart.no:80/cgi-bin/sentinel2?
bu kisim cok onemlidir... buradan da  wms e ait version... sld http://schemas.opengis.net/sld/1.1.0/
ve LAYERS ISMI https://openwms.statkart.no:80/cgi-bin/sentinel2?service=WMS

Resources keywordu uzerinden de aryaabiliriz bazi xml kaynaklarda resources keywordu  uzerinden aradigmiz bilgileri bulabiliyoruz

<WMS_Capabilities xmlns="http://www.opengis.net/wms" xmlns:sld="http://www.opengis.net/sld" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ms="http://mapserver.gis.umn.edu/mapserver" version="1.3.0" xsi:schemaLocation="http://www.opengis.net/wms http://schemas.opengis.net/wms/1.3.0/capabilities_1_3_0.xsd http://www.opengis.net/sld http://schemas.opengis.net/sld/1.1.0/sld_capabilities.xsd http://mapserver.gis.umn.edu/mapserver https://openwms.statkart.no:80/cgi-bin/sentinel2?service=WMS&version=1.3.0&request=GetSchemaExtension">

AYRICA LAYERS ISMI ICIN <Name>sentinel2</Name> icerisine bakariz

format icin 
<Format></Format> etiketlerine bakariz
<Format>image/png</Format>
<Format>image/png; mode=8bit</Format>
<Format>image/png8</Format>
<Format>image/jpeg</Format>

ayrica url icin de 
asagidaki etiklere bakilmalidir

<HTTP>
<Get>
<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://openwms.statkart.no/skwms1/wms.sentinel2?"/>
</Get>
<Post>
<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://openwms.statkart.no/skwms1/wms.sentinel2?"/>
</Post>
</HTTP>

 -->
*/

//https://kartkatalog.geonorge.no/metadata/satellittdata-sentinel-2-skyfri-mosaikk-wms/38a52b73-2ffb-47cc-9ecd-147ee18f62be
const skyfriMosaikkWMS = new TileLayer({
  source:new TileWMS({
    url:"https://openwms.statkart.no/skwms1/wms.sentinel2?",
		crossOrigin: 'anonymous',		
    params: {
					LAYERS: 'sentinel2',//<Name>sentinel2</Name>
       
          FORMAT:'image/png',
					VERSION: '1.1.0'
				}
  }),
  visible:false,
  title:"skyfriMosaikkWMS"
})

//map.addLayer(skyfriMosaikkWMS);

//https://kartkatalog.geonorge.no/metadata/traktorveg-og-skogsbilveg-wms/e45aea66-5d98-4703-8026-692c782eb5b0
const tractorRoadAndForestVehicleRoadWMS = new TileLayer({
  source:new TileWMS({
    url:"https://openwms.statkart.no/skwms1/wms.traktorveg_skogsbilveger?",
		crossOrigin: 'anonymous',
    params: {
					LAYERS: 'traktorveg_skogsbilveger_wfs',
          
          FORMAT:'image/png',
					VERSION: '1.1.0'
				}
  }),
  visible:false,
  title:"tractorRoadAndForestVehicleRoadWMS"
})

//map.addLayer(tractorRoadAndForestVehicleRoadWMS);

const norweiganMap = new TileLayer({
  source:new TileWMS({
    url:"https://opencache.statkart.no/gatekeeper/gk/gk.open?",
    crossOrigin: 'anonymous',
    params: {
      LAYERS: 'norges_grunnkart',
      VERSION: '1.1.1'
    }
}),
visible:false,
title:"norweiganMap"
})


//map.addLayer(norweiganMap);

const baseLayerGroup=new LayerGroup({
  layers:[
//    openstreetMapStandart ,
    planAreaWMS,
    skyfriMosaikkWMS,
    terrengNorweiganMapWMTS,
    tractorRoadAndForestVehicleRoadWMS,
    norweiganMap,
  
    
    //Microsoft yapimi olan BingMaps i kullaniyoruz, ama icerisinde labellar yok
  ]
})

map.addLayer(baseLayerGroup);



const baseLayerElements=document.querySelectorAll(".sidebar > input[type=radio]")


for (let baseLayerElement of baseLayerElements) {
  baseLayerElement.addEventListener("change", function(event){
    console.log(this);//hangisine tiklanirsa onu alacagiz
    console.log(event.target);//tikladigmz elementin referansin aliyoruz
    console.log(this.value)//tiklanan inputun value sini aliyoruz
    console.log(event.target.value);//Bu sekilde tikladimgz elemntin
    let baseLayerElementValue=this.value;
    let getAllUsedLayers=baseLayerGroup.getLayers();
   
    getAllUsedLayers.forEach(function(element,index,array){
      //element ile her bir layer a erismis oluyoruz bu sekilde...
        console.log(element);
        
        console.log(element.get("title"));//Bu sekilde title key ine 

        element.setVisible(baseLayerElementValue===element.get("title"));
    })   
  })
}


  })