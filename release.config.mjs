const parserOpts = {
  headerPattern: /^(\w*)(?:\((.*)\))?(!)?: (.*)$/,
  headerCorrespondence: ['type', 'scope', 'breaking', 'subject']
}

export default {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        parserOpts,
        releaseRules: [{ header: '*!*:*', release: 'major' }]
      }
    ],
    ['@semantic-release/release-notes-generator', { parserOpts }],
    [
      '@semantic-release/github',
      {
        successComment: false,
        failComment: false,
        releasedLabels: false
      }
    ]
  ]
}
