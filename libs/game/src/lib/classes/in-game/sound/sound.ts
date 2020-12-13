export class BbScriptSound {
  _context: AudioContext;
  _source: AudioBufferSourceNode;
  _volumeGain: GainNode;
  _stereoPanner: StereoPannerNode;

  constructor(
    context: AudioContext,
    source: AudioBufferSourceNode,
    volumeGain: GainNode,
    stereoPanner: StereoPannerNode
  ) {
    this._context = context;
    this._source = source;
    this._volumeGain = volumeGain;
    this._stereoPanner = stereoPanner;
  }

  get context(): AudioContext {
    return this._context;
  }

  get source(): AudioBufferSourceNode {
    return this._source;
  }
  set source(source: AudioBufferSourceNode) {
    this._source = source;
  }

  get volumeGain(): GainNode {
    return this._volumeGain;
  }

  get stereoPanner(): StereoPannerNode {
    return this._stereoPanner;
  }
}
