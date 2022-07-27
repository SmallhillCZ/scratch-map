import { Injectable } from "@angular/core";
import { JSONParser } from "@streamparser/json/dist/cjs";

@Injectable({
  providedIn: "root",
})
export class GoogleTimelineService {
  constructor() {}

  async loadTimeline() {
    // open file picker
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          accept: { "application/json": ".json" },
          description: "Google Timeline Records JSON",
        },
      ],
    });

    if (fileHandle.kind !== "file") return;

    const file = await (<Promise<File>>fileHandle.getFile());

    const stream: ReadableStream<Uint8Array> = file.stream();

    const transformer = new JSONTransformStream();

    stream.pipeThrough(transformer);
  }
}

export type LocationRecord = any;

export class JSONTransformStream extends TransformStream<
  Uint8Array,
  LocationRecord
> {
  parser: JSONParser;

  constructor() {
    super({
      start: (controller: TransformStreamDefaultController<LocationRecord>) =>
        this.start(controller),

      transform: (
        chunk: Uint8Array,
        controller: TransformStreamDefaultController<LocationRecord>
      ) => this.transform(chunk, controller),
    });

    this.parser = new JSONParser({ paths: ["$.locations.*"] });
  }

  start(controller: TransformStreamDefaultController<LocationRecord>) {
    this.parser.onValue = (value) => controller.enqueue(value);
    this.parser.onEnd = () => controller.terminate();
    this.parser.onError = (error) => controller.error(error);
  }

  async transform(
    chunk: Uint8Array,
    controller: TransformStreamDefaultController<LocationRecord>
  ) {
    const string = new TextDecoder().decode(chunk);
    this.parser.write(string);
  }
}
