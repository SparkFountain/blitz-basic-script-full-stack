export interface GameSound {
    context: AudioContext,
    source: AudioBufferSourceNode,
    volumeGain: GainNode,
    stereoPanner: StereoPannerNode
}
