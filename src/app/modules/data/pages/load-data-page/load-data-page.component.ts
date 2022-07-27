import { Component, OnInit } from "@angular/core";
import { GoogleTimelineService } from "../../services/google-timeline.service";

@Component({
  selector: "app-load-data-page",
  templateUrl: "./load-data-page.component.html",
  styleUrls: ["./load-data-page.component.scss"],
})
export class LoadDataPageComponent implements OnInit {
  constructor(private timeline: GoogleTimelineService) {}

  ngOnInit(): void {}

  loadTimeline() {
    this.timeline.loadTimeline();
  }
}
