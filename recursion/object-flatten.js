const obj = { viewedVehicles:
   [ { vin: '5XXGN4A74EG338865', recordId: '-6835366168710549708' },
     { vin: 'ZFFCW56A830133927', recordId: '-6659610725954936587' },
     { vin: 'VF9SA25C58M795115', recordId: '7694523409680159489' },
     { vin: '2G1FK1EJ6B9123881', recordId: '-1003550358278791693' },
     { vin: '2G1FB1ED4B9145713', recordId: '-5969814023969669191' },
     { vin: '2G1FG1EV3A9118074', recordId: '-7313527479323715464' },
     { vin: '1FTEX1EV3AFA14677', recordId: '-8423237911696093070' },
     { vin: '1G1YW3DW1C5103414', recordId: '16840011498984630' },
     { vin: '1FTEW1C84GKD79899', recordId: '1161369792037654054' },
     { vin: '2GKALUEK1D6425628', recordId: '-622939527497222183' } ],
  favoriteVehicles: [ { vin: '1G1YS3DW5B5105595', recordId: '5896052495081498275' } ],
  searchParams:
   { tlocation: '75201',
     limit: '18',
     'consumer-sort': 'personalized-liked',
     hosted: 'true',
     'f.year.facet.exclude': 'year' } }

const ob = {
  a: {
    aa: 1,
    ab: {
      aba: undefined,
      abb: {
        abca: 12
      }
    }
  },
  b: 2,
  c: 3,
  d: undefined
}

let flatObject = function (obj) {
  let flattened = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      let flat = flatObject(obj[key]);
      Object.keys(flat).forEach((k) => {
        if (flat[k] !== void(0)) {
          flattened[`${key}.${k}`] = flat[k];
        }
      })
    } else {
      if (obj[key] !== void(0)) {
        flattened[key] = obj[key];
      }
    }
  });
  return flattened;
}

let f = flatObject(obj);
console.log(f);