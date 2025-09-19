// LexiLearn - 단어 데이터 파싱 시스템

import { Vocabulary, VOCABULARY_DATA } from './vocabulary-data-1350-new';

export interface ParsedVocabularyData {
  vocabulary: Vocabulary[];
  totalCount: number;
  levelDistribution: Record<string, number>;
  stageDistribution: Record<string, number>;
}

export interface ImportResult {
  success: boolean;
  importedCount: number;
  errors: string[];
  data?: ParsedVocabularyData;
}

export class VocabularyParser {
  private vocabulary: Vocabulary[] = [];

  constructor() {
    this.vocabulary = [...VOCABULARY_DATA];
  }

  // CSV 형식의 단어 데이터 파싱
  parseCSVData(csvContent: string): ImportResult {
    const errors: string[] = [];
    const lines = csvContent.split('\n').filter(line => line.trim());
    const importedVocabulary: Vocabulary[] = [];

    lines.forEach((line, index) => {
      try {
        const columns = this.parseCSVLine(line);
        
        if (columns.length < 6) {
          errors.push(`Line ${index + 1}: Insufficient columns`);
          return;
        }

        const vocabulary: Vocabulary = {
          id: `imported_${Date.now()}_${index}`,
          english: columns[0].trim(),
          pronunciation: columns[1]?.trim() || '',
          korean: columns[2].trim(),
          level: this.validateLevel(columns[3].trim()),
          stage: parseInt(columns[4].trim()) || 1,
          partOfSpeech: columns[5].trim(),
          definition: columns[6]?.trim() || '',
          example: columns[7]?.trim() || '',
          exampleKorean: columns[8]?.trim() || ''
        };

        importedVocabulary.push(vocabulary);
      } catch (error) {
        errors.push(`Line ${index + 1}: ${error}`);
      }
    });

    if (importedVocabulary.length > 0) {
      this.vocabulary = [...this.vocabulary, ...importedVocabulary];
    }

    return {
      success: errors.length === 0,
      importedCount: importedVocabulary.length,
      errors,
      data: this.generateParsedData()
    };
  }

  // JSON 형식의 단어 데이터 파싱
  parseJSONData(jsonContent: string): ImportResult {
    try {
      const data = JSON.parse(jsonContent);
      const errors: string[] = [];
      const importedVocabulary: Vocabulary[] = [];

      if (Array.isArray(data)) {
        data.forEach((item, index) => {
          try {
            const vocabulary: Vocabulary = {
              id: item.id || `imported_${Date.now()}_${index}`,
              english: item.english,
              pronunciation: item.pronunciation || '',
              korean: item.korean,
              level: this.validateLevel(item.level),
              stage: parseInt(item.stage) || 1,
              partOfSpeech: item.partOfSpeech || '',
              definition: item.definition || '',
              example: item.example || '',
              exampleKorean: item.exampleKorean || ''
            };

            importedVocabulary.push(vocabulary);
          } catch (error) {
            errors.push(`Item ${index + 1}: ${error}`);
          }
        });
      } else {
        errors.push('JSON data must be an array');
      }

      if (importedVocabulary.length > 0) {
        this.vocabulary = [...this.vocabulary, ...importedVocabulary];
      }

      return {
        success: errors.length === 0,
        importedCount: importedVocabulary.length,
        errors,
        data: this.generateParsedData()
      };
    } catch (error) {
      return {
        success: false,
        importedCount: 0,
        errors: [`JSON parsing error: ${error}`]
      };
    }
  }

  // 텍스트 파일 파싱 (189.txt 형식)
  parseTextData(textContent: string): ImportResult {
    const errors: string[] = [];
    const lines = textContent.split('\n').filter(line => line.trim());
    const importedVocabulary: Vocabulary[] = [];

    lines.forEach((line, index) => {
      try {
        // 텍스트 형식: "english - korean (partOfSpeech)"
        const match = line.match(/^(.+?)\s*-\s*(.+?)\s*\((.+?)\)$/);
        
        if (match) {
          const vocabulary: Vocabulary = {
            id: `text_${Date.now()}_${index}`,
            english: match[1].trim(),
            pronunciation: '', // 기본값
            korean: match[2].trim(),
            level: 'beginner', // 기본값
            stage: Math.floor(index / 15) + 1, // 15개씩 단계 분할
            partOfSpeech: match[3].trim(),
            definition: '', // 기본값
            example: '',
            exampleKorean: ''
          };

          importedVocabulary.push(vocabulary);
        } else {
          errors.push(`Line ${index + 1}: Invalid format`);
        }
      } catch (error) {
        errors.push(`Line ${index + 1}: ${error}`);
      }
    });

    if (importedVocabulary.length > 0) {
      this.vocabulary = [...this.vocabulary, ...importedVocabulary];
    }

    return {
      success: errors.length === 0,
      importedCount: importedVocabulary.length,
      errors,
      data: this.generateParsedData()
    };
  }

  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result;
  }

  private validateLevel(level: string): 'beginner' | 'intermediate' | 'advanced' {
    const validLevels = ['beginner', 'intermediate', 'advanced'];
    return validLevels.includes(level.toLowerCase()) ? level.toLowerCase() as 'beginner' | 'intermediate' | 'advanced' : 'beginner';
  }

  private generateParsedData(): ParsedVocabularyData {
    const levelDistribution: Record<string, number> = {};
    const stageDistribution: Record<string, number> = {};

    this.vocabulary.forEach(vocab => {
      levelDistribution[vocab.level] = (levelDistribution[vocab.level] || 0) + 1;
      stageDistribution[`${vocab.level}_${vocab.stage}`] = (stageDistribution[`${vocab.level}_${vocab.stage}`] || 0) + 1;
    });

    return {
      vocabulary: this.vocabulary,
      totalCount: this.vocabulary.length,
      levelDistribution,
      stageDistribution
    };
  }

  exportToCSV(): string {
    const headers = ['english', 'korean', 'level', 'stage', 'partOfSpeech', 'example', 'exampleKorean'];
    const csvLines = [headers.join(',')];

    this.vocabulary.forEach(vocab => {
      const row = [
        `"${vocab.english}"`,
        `"${vocab.korean}"`,
        vocab.level,
        vocab.stage.toString(),
        `"${vocab.partOfSpeech}"`,
        `"${vocab.example}"`,
        `"${vocab.exampleKorean}"`
      ];
      csvLines.push(row.join(','));
    });

    return csvLines.join('\n');
  }

  exportToJSON(): string {
    return JSON.stringify(this.vocabulary, null, 2);
  }

  getVocabulary(): Vocabulary[] {
    return [...this.vocabulary];
  }

  clearVocabulary(): void {
    this.vocabulary = [];
  }
}

export const vocabularyParser = new VocabularyParser();