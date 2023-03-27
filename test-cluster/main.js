import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';


import Feature from 'ol/Feature.js';

import Point from 'ol/geom/Point.js';

import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text,
} from 'ol/style.js';
import {Cluster, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer2, Vector as VectorLayer} from 'ol/layer.js';
import {boundingExtent} from 'ol/extent.js';

// const map = new Map({
//   target: 'map',
//   layers: [
//     new TileLayer({
//       source: new OSM()
//     })
//   ],
//   view: new View({
//     center: [0, 0],
//     zoom: 2
//   })
// });




//[1181587.1557323588, 8384806.4286818355] -Oslo
//[1196286.7573005953, 8382378.321937622] Gamle Aker
//[1198790.3162000852, 8381240.33838522] Tøyen
//[1191096.510685546, 8380899.852127061] Skarspno



//[1005844.0034385305, 8265580.37022253] Vestfold og Telemark
//[1068935.7233506376, 8225579.575152853] Skien
// [1073831.3255811376, 8210138.675505912] Porsgrunn 
//[1131890.6986440904, 8194202.11543706] Sandefjord
//[1157792.0928421684, 8238836.714127301] Tønsberg



let skienPlaces = [
  {id:1,name:"Skien-1",coord:[1067745.2998383467, 8222799.520519945]},
  {id:2,name:"Skien-2",coord:[1063430.4844371157, 8223724.123820209]},
  {id:3,name:"Skien-3",coord:[1062274.730311786, 8226574.983996022]},
  {id:4,name:"Skein-4",coord:[1078147.086966314, 8230658.648572187] },
  {id:5,name:"Skien-5",coord:[1073601.1207400172, 8232276.704347649] },
];

skienPlaces = skienPlaces.map(item=>{
  let {coord,name,id} = item;
  return new Feature({
    geometry:new Point(coord),
    name,
    id
  })
})

let porsgrunPlaces = [
  {id:1,name:"Porsgrunn-1",coord:[1066906.3430176247, 8209035.741119681]},
  {id:2,name:"Porsgrunn-2",coord:[1069176.8212111434, 8207601.754892196]},
  {id:3,name:"Porsgrunn-3",coord: [1079578.6800066372, 8209765.06050861]},
  {id:4,name:"Porsgrunn-4",coord:[1079399.4317282017, 8211199.046736096]},
];

porsgrunPlaces = porsgrunPlaces.map(item=>{
  let {coord,name,id} = item;
  return new Feature({
    geometry:new Point(coord),
    name,
    id
  })
})

//Cluster mantiginda coordinatlerin birbirine yakinligina gore kendisi otomatik olarak birine tiklayinca onun alanina giren digerlerine yakinlasitiriyor yani biz elimzdeki tum features leri bir dizi icnde tutacagiz ve koordinatlarin yakinligina gore cluster tikladikca digerlerini gosterecek galiba

let cities = [
  {id:1,name:"Skien",coord:[1068935.7233506376, 8225579.575152853],places:skienPlaces},
  {id:1,name:"Skien-1",coord:[1067745.2998383467, 8222799.520519945]},
  {id:2,name:"Skien-2",coord:[1063430.4844371157, 8223724.123820209]},
  {id:3,name:"Skien-3",coord:[1062274.730311786, 8226574.983996022]},
  {id:4,name:"Skein-4",coord:[1078147.086966314, 8230658.648572187] },
  {id:5,name:"Skien-5",coord:[1073601.1207400172, 8232276.704347649] },
  {id:2,name:"Porsgrunn",coord:[1073831.3255811376, 8210138.675505912],places:porsgrunPlaces},
  {id:3,name:"Sandefjord",coord:[1131890.6986440904, 8194202.11543706],places:[]},
  {id:4,name:"Tønsberg",coord:[1157792.0928421684, 8238836.714127301],places:[]},
  {id:1,name:"Porsgrunn-1",coord:[1066906.3430176247, 8209035.741119681]},
  {id:2,name:"Porsgrunn-2",coord:[1069176.8212111434, 8207601.754892196]},
  {id:3,name:"Porsgrunn-3",coord: [1079578.6800066372, 8209765.06050861]},
  {id:4,name:"Porsgrunn-4",coord:[1079399.4317282017, 8211199.046736096]},
];

var municipalityFeatures = [];
console.log(municipalityFeatures.length);
cities.forEach(city=>{
  let {name,coord,id,places} = city;
 
  let feature = new Feature({
    geometry:new Point(coord),
    name,
    id,
    // features:places//nested features
  });
  municipalityFeatures.push(feature);
})



let telemarkFeature = new Feature({
  geometry:new Point([1005844.0034385305, 8265580.37022253]),
  name:"Telemark",
  // features:municipalityFeatures//nested features
});

/*
Skien
[1067745.2998383467, 8222799.520519945] Skien-1
[1063430.4844371157, 8223724.123820209] Skien-2
[1062274.730311786, 8226574.983996022]  Skien-3
[1078147.086966314, 8230658.648572187]  Skien-4
[1073601.1207400172, 8232276.704347649] Skien-5

Porsgrunn 
([1066906.3430176247, 8209035.741119681] Porsgrunn-1
 [1069176.8212111434, 8207601.754892196] Porsgrunn-2
 [1079578.6800066372, 8209765.06050861]  Porsgrunn-3
 [1079399.4317282017, 8211199.046736096] Porsgrunn-4

*/

const source = new VectorSource({
  features: municipalityFeatures,
});


const clusterSource = new Cluster({
  distance: parseInt(40, 10),//input value sinden 40 geliyor
  //10 sayisi arttikca haritadaki noktalar azaliyor aralrindanki mesafe artiyor..ama 10 sayisi 5 olunca nokta sayisi artarken aralarindaki distance azaliyor
  minDistance: parseInt(20, 10),
  source: source,
});

const styleCache = {};


//Burdaki feature lar harita da ilk actigimzda karsimiza gelen pointlerdir noktalardir ve biz zoom-in yaptgmizda bu noktlarin sayisi artiyor
const clusters = new VectorLayer({
  source: clusterSource,
  style: function (feature) {
   // console.log("feature.get('features'): ",feature.get('features'));
    //Her bir feature icerisinde o feature ye ait features isminde key var ve onun value si de onun alt feature leridir yani dizi icerisindeki feature lerdir... 
    
    const size = feature.get('features').length;//Kac tane ise o numarayi gosteriyoruz bakinca kullanici sunu bilecek bu point marker kac numara gosteriyorsa yaklasinca o adette alt datalarini gorecek
    let name = feature.get('name');
    console.log("name: ",feature.getKeys());
    console.log("size: ",size);
    //Burda gruplayamayi kendisi coordinatlarin yakinligina gore otomatik yapiyor ve ona gore de size:2, size:1, size:3 geliyor.. 
    let style = styleCache[size];
    if (!style) {
      style = new Style({
        image: new CircleStyle({
          radius: 10,
          stroke: new Stroke({
            color: '#fff',
          }),
          fill: new Fill({
            color: '#3399CC',
          }),
        }),
        text: new Text({
          text: size.toString(),
          fill: new Fill({
            color: '#fff',
          }),
        }),
      });
      styleCache[size] = style;
    }
    return style;
  },
});


const raster = new TileLayer2({
  source: new OSM(),
});

const map = new Map({
  layers: [raster, clusters],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});


map.on('click', (e) => {
  
  clusters.getFeatures(e.pixel).then((clickedFeatures) => {
    if (clickedFeatures.length) {
      // Get clustered Coordinates
      const features = clickedFeatures[0].get('features');
      console.log("features-length: ",features.length);
     
     features.forEach(item=>{
      console.log("name::: ",item.get("name"))
     })
      
      console.log("munfeatures2:")
      if (features.length > 1) {
        const extent = boundingExtent(
          features.map((r) => r.getGeometry().getCoordinates())
        );
        map.getView().fit(extent, {duration: 3500, padding: [100, 100, 100, 100]});
      }
    }
  });
});


/*
 Ilk once elimzdeki tum feature leri biz bir array icine atip bunu sources e veriyoruz
 Ardindan da bu cluster da source olarak kullanililiyor ve cluster in yapisi su sekildedir
 Kendisi point lerin koordinatlarinin birbirine yakinliklarina gore, onlari grupluyor ve bizim karsimiza da grupladigi pointler icin
 yuvarlak bir style olusturup uzerinde kac adet point barindiriyo ise onu gosteriyor
 Bunu kendisi coordinatlarin yakinligina gore yapiyor ve biz zoom-in i kullandikca da dinamik olarak tekrar bir gruplama yapiyor 
 Bunu asagidaki yerde yapiyor

 const clusters = new VectorLayer({
  source: clusterSource,
  style: function (feature) {
   // console.log("feature.get('features'): ",feature.get('features'));
    //Her bir feature icerisinde o feature ye ait features isminde key var ve onun value si de onun alt feature leridir yani dizi icerisindeki feature lerdir... 
    console.log(feature.getKeys());
    //2000 tane feature olusturup bir dizi icine atiyor bunu birbirine yakinligina gore gruplayan clustor in kendisi oluyor ve her yaklastikca bunlarin yakinliklarina gore, yine grupliyor ve uzerinde ki sayi kac ise ona yaklasirsan onun altinda bir o kadar daha point gelecek demektir
//Yani burdaki feature.get("features").length dedigi sudur ki, 
    const size = feature.get('features').length;
    console.log("size: ",size);//features icerisinde bulunan adet sayisini verecek
    let style = styleCache[size];

    Daha sonra ise 


map.on('click', (e) => {
  
  clusters.getFeatures(e.pixel).then((clickedFeatures) => {
    if (clickedFeatures.length) {
      // Get clustered Coordinates
      const features = clickedFeatures[0].get('features');
      console.log("features.length: ",features.length);
      if (features.length > 1) {
        const extent = boundingExtent(
          features.map((r) => r.getGeometry().getCoordinates())
        );
        map.getView().fit(extent, {duration: 1000, padding: [50, 50, 50, 50]});
      }
    }
  });

  Bu kisimda biz const features = clickedFeatures[0].get('features'); olarak tikladigmz point altinda kac tane feature var ise onlari bir dizi icerisinde aldigmiz yerdir ve bura da her bir dizimize ait spesifk name, id vs var ise onlari foreach ile dondurerek alabiliriz
  Ve tiklandigi zaman burasi hem animasyonu  hem padding i ayarliyor hem de tekrar dan tiklanan point altindaki noktalar yakinliklarina gore gruplaniyor ve birkez daha  const clusters = new VectorLayer({ tetiklenerek bunlari bir kez daha yakinliklarina gore grupluyor ve ona gore de her grup features un lengthine gore point markalari uzerinde kac adet feature var ise onlari gorecek sekilde geliyor karsimiza

  VE tekrardan gruplanmis olan noktalar dan ornegin uzerinde 4 yazan bir noktaya tikladigmz zaman bu 4 feature a ait datalara erisebiliyoruz ve tekrardan bir zoom-in olmus oluyor her tiklagimzda ve yeniden bir daha yaklasarak birbrine yakinliklarina gore bir gruplama soz konusu olacaktir  
 
*/