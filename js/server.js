export async function invokeServer(_action, args) {
  return await (await fetch("notes/" + args.name)).text();
}

let { invoke } = window?.__TAURI__?.tauri ?? {};

if (invoke === undefined) {
  invoke = invokeServer;
}

export { invoke };
