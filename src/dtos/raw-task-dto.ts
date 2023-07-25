export interface RawTaskDto {
  header: string;
  content: string;
}

/**
 * Create new RawTaskDto
 * @param {string} header
 * @param {string} content
 * @returns {RawTaskDto}
 */
export function newRawTaskDto(header: string, content: string): RawTaskDto {
  const rawTaskDto: RawTaskDto = {
    header: header,
    content: content,
  };

  return rawTaskDto;
}
