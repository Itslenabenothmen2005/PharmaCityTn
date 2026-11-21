import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="container" style={{ padding: '80px 20px', maxWidth: '600px' }}>
      <EmptyState
        icon={FileQuestion}
        title="Page non trouvée (404)"
        description="La page que vous recherchez n'existe pas ou a été déplacée. Vérifiez l'adresse ou retournez à l'accueil."
        action={
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="primary" icon={Home}>
              Retour à l'accueil
            </Button>
          </Link>
        }
      />
    </div>
  );
}
