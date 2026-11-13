const NBSP = String.fromCharCode(160);

const SHORT_WORDS =
  /(^|[\s(«„"])(в|во|и|с|со|к|ко|о|об|у|а|на|по|за|от|до|из|не|ни|для|без|при|или|но|что|как|это|же)\s+/giu;

const glue = (text: string) => text.replace(SHORT_WORDS, (_, before: string, word: string) => `${before}${word}${NBSP}`);

export const typograph = (text: string) =>
  glue(glue(text))
    .replace(/Цех(а)? Климата/g, `Цех$1${NBSP}Климата`)
    .replace(/ — /g, `${NBSP}— `);
