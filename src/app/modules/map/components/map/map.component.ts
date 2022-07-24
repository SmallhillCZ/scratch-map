import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import * as turf from "@turf/turf";
import { GeoJSON, Map, MapOptions, TileLayer } from "leaflet";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit, AfterViewInit {
  map!: Map;
  scratchLayer!: GeoJSON;

  constructor() {}

  ngOnInit(): void {}

  @ViewChild("mapEl") mapEl!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.map = new Map(this.mapEl.nativeElement);
    this.map.on("load", () => this.loadGrid());

    this.map.setView([55.67, 12.56], 14);

    const tiles = new TileLayer(
      "https://mapserver.mapy.cz/base-m/{z}-{x}-{y}",
      {
        tileSize: 256,
        attribution:
          'Mapové podklady od <a target="_top" rel="noopener" href="https://mapy.cz/">Seznam.cz</a> a <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>.',
      }
    );

    tiles.addTo(this.map);

    this.scratchLayer = new GeoJSON(undefined, {
      style: { stroke: false, fill: true, fillOpacity: 1, fillColor: "#333" },
    });
    this.scratchLayer.addTo(this.map);

    // this.map.on("dragend", () => this.loadGrid(true));
    // this.map.on("zoomend", () => this.loadGrid(true));
  }

  async loadGrid() {
    const bounds = this.map.getBounds();

    const bbox: [number, number, number, number] = [
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ];

    const grid = turf.hexGrid(bbox, 50, {
      units: "meters",
      properties: { stroke: 0 },
    });
    grid.features = grid.features.filter((feature) => Math.random() > 0.5);

    const mask = turf.mask(grid);

    this.scratchLayer.clearLayers();
    this.scratchLayer.addData(mask);
  }
}
