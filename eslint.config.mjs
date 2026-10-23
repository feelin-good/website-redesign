import nextVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextVitals,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_"
        }
      ],
      "react-hooks/set-state-in-effect": "warn"
    },
  },
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
]

export default config
