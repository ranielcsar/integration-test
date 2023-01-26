export async function withTryCatch(callback: () => Promise<void>) {
  try {
    await callback()
  } catch (err: any) {
    console.log(err.message)
  }
}
