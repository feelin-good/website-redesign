// Pulls @react-three/fiber's global JSX augmentation into the program so that
// <mesh>, <group>, <instancedMesh> etc. typecheck in every component without
// each file needing its own import from the library.
import '@react-three/fiber'
