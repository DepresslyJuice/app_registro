describe('App Basic Test (Pipeline)', () => {
  it('should pass the pipeline test successfully', () => {
    // Este es un test básico que siempre pasará.
    // Garantiza que la configuración de Jest esté funcionando en el entorno de CI (Pipeline).
    expect(true).toBe(true);
    expect(1 + 1).toBe(2);
  });

  it('should verify that the environment can run basic math and assertions', () => {
    const data = { name: 'pipeline', active: true };
    expect(data.name).toEqual('pipeline');
    expect(data.active).toBeTruthy();
  });
});
