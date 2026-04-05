export interface Constellation {
  name: string;
  brightestStar: string;
  mythology: string;
  starCount: number;
  season: string;
}

export interface DetectionResult {
  id: string;
  constellation: Constellation | null;
  confidence: number;
  imageUrl: string;
  detectedAt: Date;
  error?: string;
  reason?: string;
}

export async function detectConstellation(imageFile: File, imageUrl: string): Promise<DetectionResult> {
  const id = crypto.randomUUID();
  const detectedAt = new Date();

  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch("http://localhost:5000/api/detections/analyze", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Server error");
    }

    const data = await response.json();

    if (!data.matched) {
      return { id, constellation: null, confidence: 0, imageUrl, detectedAt, reason: data.reason };
    }

    return {
      id,
      constellation: {
        name: data.name,
        brightestStar: data.brightestStar,
        mythology: data.mythology,
        starCount: data.starCount,
        season: data.season,
      },
      confidence: data.confidence,
      imageUrl,
      detectedAt,
    };
  } catch (err) {
    return {
      id,
      constellation: null,
      confidence: 0,
      imageUrl,
      detectedAt,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
