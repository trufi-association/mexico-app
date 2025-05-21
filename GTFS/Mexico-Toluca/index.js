const { osmToGtfs, OSMOverpassDownloader } = require('../..')

osmToGtfs({
    outputFiles: { outputDir: __dirname + '/out', trufiTPData: true, gtfs: true, },
    geojsonOptions: {
        osmDataGetter: new OSMOverpassDownloader({
            south: 19.022213,
            west: -99.828963,
            north: 19.600237,
            east: -99.461195,
        }), skipRoute: (route) => {
            return ![14205514,14273777,14273762,14273843,14273821,14273746,14273735,14250435,14250451,14249884,14249871,14246048,14245979,18623160,14245947,14245927,14269629,14269496,14273878,14273862,14226411,14226337,14277168,14174933,14174952,14180518,16301409,16301410].includes(route.id)
        }
    },
    gtfsOptions: {
        fakeStops: (routeFeature) => [].includes(routeFeature.properties.id),
        stopNameBuilder: (stops) => {
            if (!stops || stops.length == 0) {
                stops = ["Innominada"]
            }
            return stops.join(" y ")
        },
        agencyTimezone: "America/Mexico_City",
        agencyUrl: "https://example.com/",
        defaultFares: { currencyType: "MXN" },
        feed: {
            publisherUrl: "https://example.com",
            publisherName: "Oaxaca",
            lang: "es",
            version: new Date().toUTCString(),
            contactEmail: "email@example.com",
            contactUrl: "http://support.example.com",
            startDate: "20000101",
            endDate: "21000101",
            id: "oaxaca-me"
        }
    }
}).catch(error => console.error(error))
