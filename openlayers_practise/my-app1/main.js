import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import TileSource from 'ol/source/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
//Layer source for the OpenStreetMap tile server.

const map = new Map({
  target: 'map',
  // layers: [
  //   new TileLayer({
  //     source: new OSM()//OSM demek Open Street Map demektir
  //   })
  // ],
  view: new View({
    center: fromLonLat([72.585717, 23.021245]),
    zoom: 8
  })
});

let osmTile = new TileLayer({
  title:"Open Street Map",
  visible:true,
  source:new OSM()
});

map.addLayer(osmTile);

map.on("click",function(event){
  console.log(event.coordinate);
})

let IndiaStateBoundary7Tile = new TileLayer({
  title:"India States",
  source:new TileWMS({//WMS-geoserver dan gelen-Layer source for tile data from WMS servers.
url:"http://localhost:9090/geoserver/geo-demo/wms",
//url ile geoserver dan fetch edecegiz data kaynagini
//geoserver da layerpreview dan hazirladigmz layer lardan indiastateboundary4 u openlayers da tiklayarak acariz ve o map i goruntuleriz ve o acilan adres cubugundaki url in wms e olan kismini kopyalariz
params:{"LAYERS":"geo-demo:india_state_boundary_pg7","TILED":true},
//hangi geoserver da hangi layer i kullanacagmiz i belli etmek icin params kullaniyoruz. params a biz geoserver da previewlayer yaptiktan sonra gelen sayfadaki Name olarak hangisni kullaniyorsak onu yaziyourz
//geoserver in wms server ini kullaniyoruz, consume ediyoruz
serverType:"geoserver",
visible:true
  })
});

//polbnda_ind_pg4
let IndiaPolbnda_Ind_Pg4Tile = new TileLayer({
  title:"India District",
  source:new TileWMS({//WMS-geoserver dan gelen-Layer source for tile data from WMS servers.
url:"http://localhost:9090/geoserver/geo-demo/wms",
//url ile geoserver dan fetch edecegiz data kaynagini
//geoserver da layerpreview dan hazirladigmz layer lardan indiastateboundary4 u openlayers da tiklayarak acariz ve o map i goruntuleriz ve o acilan adres cubugundaki url in wms e olan kismini kopyalariz
params:{"LAYERS":"geo-demo:polbnda_ind_pg4","TILED":true},
//hangi geoserver da hangi layer i kullanacagmiz i belli etmek icin params kullaniyoruz. params a biz geoserver da previewlayer yaptiktan sonra gelen sayfadaki Name olarak hangisni kullaniyorsak onu yaziyourz
//geoserver in wms server ini kullaniyoruz, consume ediyoruz
serverType:"geoserver",
visible:true
  })
});


map.addLayer(IndiaPolbnda_Ind_Pg4Tile);
map.addLayer(IndiaStateBoundary7Tile);

//layer lardan hangisi en altta eklenirse o en uste gelecektir bunu bilelim yani su anda en ustte IndiaStateBoundary7Tile gozukecektir ve biz layerlarimiz arasidna priority da yapabiliyoruzo....
//Geo server dan alacagimz datalarimiz WMS geoserver tile dir

//
/*
ol/source/Source~Source bunun altinda 

Subclasses

ImageSource
TileSource
VectorSource

Extends
BaseObject


Subclasses lardasn TileSource ye tiklariz
ol/source/Tile~TileSource

Subclasses

DataTileSource
UTFGrid
UrlTile

Extends
Source

Bunlardan da UrlTile a tiklariz 
ol/source/UrlTile~UrlTile

Subclasses

TileImage
VectorTile

Extends
TileSource

Burdan da TileImage e tiklariz

ol/source/TileImage~TileImage

Subclasses

BingMaps
IIIF
OGCMapTile
TileArcGISRest
TileJSON
TileWMS
WMTS
XYZ
Zoomify

Extends
UrlTile

Burdan da artik geoserver da hazirladigmiz kaynaklarimizi kullancagmz TileWMS i kullanaagiz

ol/source/TileWMS~TileWMS

WMS server Web Map Service is a standart protocol developed by the Open Geospatial Consortium for serving georeferenced map images over the internet

*/