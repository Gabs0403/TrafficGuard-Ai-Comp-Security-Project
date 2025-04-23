import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FirewallRules() {
  const [rules, setRules] = useState([]);
  const [chainFilter, setChainFilter] = useState('ALL');

  useEffect(() => {
    axios.get('/api/firewall_rules')
      .then(res => {
        const parsed = res.data.firewall_rules
          .split('\n')
          .map(line => {
            const m = line.match(/^Chain\s+(\w+)/);
            return m ? { chain: m[1], text: line } : null;
          })
          .filter(Boolean);
        setRules(parsed);
      })
      .catch(console.error);
  }, []);

  const chains = Array.from(new Set(rules.map(r => r.chain)));
  const filtered = chainFilter === 'ALL'
    ? rules
    : rules.filter(r => r.chain === chainFilter);

  return (
    <div className="mb-4">
      <h3>Firewall Rules</h3>
      <select
        className="form-select mb-2"
        value={chainFilter}
        onChange={e => setChainFilter(e.target.value)}
      >
        <option value="ALL">All Chains</option>
        {chains.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <pre style={{ maxHeight: 200, overflowY: 'auto' }}>
        {filtered.map((r, i) => <div key={i}>{r.text}</div>)}
      </pre>
    </div>
  );
}
