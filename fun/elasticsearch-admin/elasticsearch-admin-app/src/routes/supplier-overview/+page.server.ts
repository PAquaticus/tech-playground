import es from '$lib/es';
import type {
	AggregationsAggregationContainer,
	SearchTotalHits
} from '@elastic/elasticsearch/lib/api/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const res = es.search({
		index: 'products',
		query: {
			match_all: {}
		},
		track_total_hits: true,
		size: 0,
		_source: false,
		aggs: {
			supplierAggregation,
			distinctProgramsAggregation,
			distinctSuppliersAggregation
		}
	});

	const { hits, aggregations } = await res;
	console.log(aggregations);

	const searchTotalHits: SearchTotalHits | undefined = hits.total as SearchTotalHits;
	const distinctPrograms = aggregations?.distinctProgramsAggregation.value;
	const distinctSuppliers = aggregations?.distinctSuppliersAggregation.value;

	return {
		searchTotalHits: searchTotalHits,
		distinctPrograms: distinctPrograms,
		distinctSuppliers: distinctSuppliers,
		aggregations: aggregations?.supplierAggregation.buckets ?? []
	};
};

const supplierAggregation: AggregationsAggregationContainer = {
	composite: {
		size: 50,
		sources: [
			{
				'defaultPurchaseInfo.supplierReference.displayName': {
					terms: {
						field: 'defaultPurchaseInfo.supplierReference.displayName.raw',
						missing_bucket: false,
						order: 'asc'
					}
				}
			},
			{
				'defaultPurchaseInfo.programReference.displayName': {
					terms: {
						field: 'defaultPurchaseInfo.programReference.displayName.raw',
						missing_bucket: false,
						order: 'asc'
					}
				}
			}
		]
	}
};

const distinctProgramsAggregation: AggregationsAggregationContainer = {
	cardinality: {
		field: 'supplierPlusProgramKey'
	}
};

const distinctSuppliersAggregation: AggregationsAggregationContainer = {
	cardinality: {
		field: 'defaultPurchaseInfo.supplierReference.businessId'
	}
};
