export interface Options {
  loop: boolean;
  min: number;
  max: number;
  speed: number;
  border: string;
}

export const defaults: Options = {
  loop: true,
  min: 75,
  max: 400,
  speed: 50,
  border: '2px solid #FF0',
};
