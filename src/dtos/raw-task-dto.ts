export interface RawTaskDto {
  _id?: string;
  header: string;
  content: string;
  group: string[]
}

/**
 * Create new RawTaskDto
 * @param {string} header
 * @param {string} content
 * @returns {RawTaskDto}
 */
export function newRawTaskDto(header: string, content: string, group: string[] = []): RawTaskDto {
  const rawTaskDto: RawTaskDto = {
    header: header,
    content: content,
    group: []
  };

  return rawTaskDto;
}
