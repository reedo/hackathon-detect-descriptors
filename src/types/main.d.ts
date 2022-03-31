/** Result of the ML5 classification. */
declare interface ClassificationResult {
  /** The guess at what the image is. */
  label: string;
  /** How confident ML5 is that the label is correct. */
  confidence: number;
}
