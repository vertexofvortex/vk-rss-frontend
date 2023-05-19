export function loadState() {
  try {
    const serializedState = localStorage.getItem("redux");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("redux", serializedState);
  } catch (e) {
    // Ignore
  }
}
